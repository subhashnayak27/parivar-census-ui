import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    createMember,
    updateMember
} from "../../services/memberService";

import { getStates } from "../../services/stateService";
import { getDistrictsByState } from "../../services/districtService";
import { getVillagesByDistrict } from "../../services/villageService";
import { getFamiliesByVillage } from "../../services/familyService";

const gotras = [
    {
        gotraName: "Bharadwaj",
        pata: "Pandey, Pata, Ghuratiya, Setwara"
    },
    {
        gotraName: "Vats",
        pata: "Varmele, Chenthara, Vajanya, Dubey"
    },
    {
        gotraName: "Kashyap",
        pata: "Nekara, Tripathi, Tiwari"
    },
    {
        gotraName: "Katyayan",
        pata: "Pariya, Guta, Masand, Chaubey"
    },
    {
        gotraName: "Gautam (Dhananjay)",
        pata: "Joshi"
    },
    {
        gotraName: "Garg",
        pata: "Jatariya, Gangele"
    },
    {
        gotraName: "Shandilya",
        pata: "Bhatt"
    },
    {
        gotraName: "Kavist",
        pata: "Nagar, Pathak"
    },
    {
        gotraName: "Upamanyu",
        pata: "Agariya"
    },
    {
        gotraName: "Sankritya",
        pata: "Vinda"
    },
    {
        gotraName: "Atri",
        pata: "Rayriya, Mishra"
    },
    {
        gotraName: "Parashar",
        pata: "Laktakiya, Patairiya"
    },
    {
        gotraName: "Kaushal (Kashyap)",
        pata: "Vishwamitra"
    },
    {
        gotraName: "Sanakadik",
        pata: "Pidoliya, Upadhyay"
    },
    {
        gotraName: "Yamdagni",
        pata: "Kyore"
    },
    {
        gotraName: "Durvasa",
        pata: "Dodansiya, Pujari"
    },
    {
        gotraName: "Vashishtha",
        pata: "Jhank, Purohit"
    }
];

const EMPTY_FORM = {
    stateId: "",
    districtId: "",
    villageId: "",
    familyId: "",

    firstName: "",
    lastName: "",

    gender: "",
    dateOfBirth: "",
    birthTime: "",

    alive: true,
    dateOfDeath: "",

    relationship: "",
    maritalStatus: "",

    mobileNo: "",
    aadhaarNo: "",

    occupation: "",
    education: "",

    gotra: "",
    pata: "",
    kuldevi: ""
};

const toId = (value) =>
    value === null || value === undefined || value === ""
        ? ""
        : String(value);

const normalizeLookupList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.content)) return payload.content;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.content)) return payload.data.content;
    return [];
};

function MemberForm({ member, onSuccess, onClose }) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: EMPTY_FORM
    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [families, setFamilies] = useState([]);

    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [loadingVillages, setLoadingVillages] = useState(false);
    const [loadingFamilies, setLoadingFamilies] = useState(false);

    const selectedStateId = watch("stateId");
    const selectedDistrictId = watch("districtId");
    const selectedVillageId = watch("villageId");
    const selectedGotra = watch("gotra");
    const alive = watch("alive");

    /* =========================================================
       Load states once
    ========================================================= */
    useEffect(() => {
        let active = true;

        const load = async () => {
            try {
                setLoadingStates(true);

                const response = await getStates({
                    page: 0,
                    size: 1000,
                    sortBy: "id",
                    direction: "asc"
                });

                if (!active) return;

                const stateList = normalizeLookupList(response?.data?.data);

                console.log("States API response:", response?.data);
                console.log("States loaded:", stateList);

                setStates(stateList);
            } catch (error) {
                if (!active) return;

                console.error("Failed to load states", error);
                toast.error("Failed to load states");
                setStates([]);
            } finally {
                if (active) {
                    setLoadingStates(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, []);

    /* =========================================================
       Load/edit form data

       Important:
       We reset ALL IDs together. The three cascading effects
       below then load their own options based on those IDs.

       There is no manual "load edit data" sequence and no
       districtExists/villageExists/familyExists gate.
    ========================================================= */
    useEffect(() => {
        if (!member) {
            reset(EMPTY_FORM);
            setDistricts([]);
            setVillages([]);
            setFamilies([]);
            return;
        }

        const editValues = {
            stateId: toId(member.stateId),
            districtId: toId(member.districtId),
            villageId: toId(member.villageId),
            familyId: toId(member.familyId),

            firstName: member.firstName ?? "",
            lastName: member.lastName ?? "",

            gender: member.gender ?? "",
            dateOfBirth: member.dateOfBirth ?? "",
            birthTime: member.birthTime ?? "",

            alive: member.alive !== undefined
                ? Boolean(member.alive)
                : true,
            dateOfDeath: member.dateOfDeath ?? "",

            relationship: member.relationship ?? "",
            maritalStatus: member.maritalStatus ?? "",

            mobileNo: member.mobileNo ?? "",
            aadhaarNo: member.aadhaarNo ?? "",

            occupation: member.occupation ?? "",
            education: member.education ?? "",

            gotra: member.gotra ?? "",
            pata: member.pata ?? "",
            kuldevi: member.kuldevi ?? ""
        };

        console.log("Member edit values:", editValues);
        reset(editValues);
    }, [member, reset]);

    /* =========================================================
       State -> Districts

       This effect handles BOTH:
       - user changing State
       - edit mode restoring an existing State
    ========================================================= */
    useEffect(() => {
        let active = true;

        setDistricts([]);

        if (!selectedStateId) {
            setLoadingDistricts(false);
            return () => {
                active = false;
            };
        }

        const load = async () => {
            try {
                setLoadingDistricts(true);

                const response = await getDistrictsByState(
                    selectedStateId
                );

                if (!active) return;

                const list = normalizeLookupList(response?.data?.data);
                console.log("Districts loaded for state", selectedStateId, list);
                setDistricts(list);
            } catch (error) {
                if (!active) return;

                console.error("Failed to load districts", error);
                toast.error("Failed to load districts");
                setDistricts([]);
            } finally {
                if (active) {
                    setLoadingDistricts(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [selectedStateId]);

    /* =========================================================
       District -> Villages
    ========================================================= */
    useEffect(() => {
        let active = true;

        setVillages([]);

        if (!selectedDistrictId) {
            setLoadingVillages(false);
            return () => {
                active = false;
            };
        }

        const load = async () => {
            try {
                setLoadingVillages(true);

                const response = await getVillagesByDistrict(
                    selectedDistrictId
                );

                if (!active) return;

                const list = normalizeLookupList(response?.data?.data);
                console.log("Villages loaded for district", selectedDistrictId, list);
                setVillages(list);
            } catch (error) {
                if (!active) return;

                console.error("Failed to load villages", error);
                toast.error("Failed to load villages");
                setVillages([]);
            } finally {
                if (active) {
                    setLoadingVillages(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [selectedDistrictId]);

    /* =========================================================
       Village -> Families
    ========================================================= */
    useEffect(() => {
        let active = true;

        setFamilies([]);

        if (!selectedVillageId) {
            setLoadingFamilies(false);
            return () => {
                active = false;
            };
        }

        const load = async () => {
            try {
                setLoadingFamilies(true);

                const response = await getFamiliesByVillage(
                    selectedVillageId
                );

                if (!active) return;

                const list = normalizeLookupList(response?.data?.data);
                console.log("Families loaded for village", selectedVillageId, list);
                setFamilies(list);
            } catch (error) {
                if (!active) return;

                console.error("Failed to load families", error);
                toast.error("Failed to load families");
                setFamilies([]);
            } finally {
                if (active) {
                    setLoadingFamilies(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [selectedVillageId]);

    /* =========================================================
       User selection handlers

       Only update the form and clear descendants.
       The effects above perform the API calls.
    ========================================================= */
    const handleStateChange = (stateId) => {

        setValue("stateId", stateId, {
            shouldValidate: true,
            shouldDirty: true
        });

        setValue("districtId", "", {
            shouldValidate: true,
            shouldDirty: true
        });
        setValue("villageId", "", {
            shouldValidate: true,
            shouldDirty: true
        });
        setValue("familyId", "", {
            shouldValidate: true,
            shouldDirty: true
        });

        setVillages([]);
        setFamilies([]);
    };

    const handleDistrictChange = (districtId) => {

        setValue("districtId", districtId, {
            shouldValidate: true,
            shouldDirty: true
        });

        setValue("villageId", "", {
            shouldValidate: true,
            shouldDirty: true
        });
        setValue("familyId", "", {
            shouldValidate: true,
            shouldDirty: true
        });

        setFamilies([]);
    };

    const handleVillageChange = (villageId) => {

        setValue("villageId", villageId, {
            shouldValidate: true,
            shouldDirty: true
        });

        setValue("familyId", "", {
            shouldValidate: true,
            shouldDirty: true
        });
    };

    const handleGotraChange = (gotraName) => {
        const gotra = gotras.find(
            item => item.gotraName === gotraName
        );

        setValue("gotra", gotraName, {
            shouldDirty: true,
            shouldValidate: true
        });

        setValue("pata", gotra?.pata ?? "", {
            shouldDirty: true
        });
    };

    const handleAliveChange = (isAlive) => {

        setValue("alive", isAlive, {
            shouldDirty: true,
            shouldValidate: true
        });

        if (isAlive) {
            setValue("dateOfDeath", "", {
                shouldDirty: true,
                shouldValidate: true
            });
        }
    };

    /* =========================================================
       Submit
    ========================================================= */
    const onSubmit = async (formData) => {
        const data = {
            ...formData,
            stateId: toId(formData.stateId),
            districtId: toId(formData.districtId),
            villageId: toId(formData.villageId),
            familyId: toId(formData.familyId),
            alive: Boolean(formData.alive),
            dateOfDeath: formData.alive
                ? null
                : formData.dateOfDeath || null
        };

        try {
            console.log(
                member
                    ? "Updating member:"
                    : "Creating member:",
                data
            );

            if (member) {
                await updateMember(member.id, data);
                toast.success("Member updated successfully");
            } else {
                await createMember(data);
                toast.success("Member created successfully");
            }

            onSuccess();
        } catch (error) {
            console.error("Member save failed", error);

            toast.error(
                error?.response?.data?.message ||
                (
                    member
                        ? "Failed to update member"
                        : "Failed to create member"
                )
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* State */}
            <div className="mb-3">
                <label className="form-label">State</label>
                <Controller
                    name="stateId"
                    control={control}
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                        <select
                            className="form-select"
                            value={field.value || ""}
                            onChange={(e) => handleStateChange(e.target.value)}
                            disabled={loadingStates}
                        >
                            <option value="">
                                {loadingStates ? "Loading States..." : "Select State"}
                            </option>
                            {states.map((state) => (
                                <option key={state.id} value={String(state.id)}>
                                    {state.stateName}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <small className="text-danger">{errors.stateId?.message}</small>
            </div>

            {/* District */}
            <div className="mb-3">
                <label className="form-label">District</label>
                <Controller
                    name="districtId"
                    control={control}
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                        <select
                            className="form-select"
                            value={field.value || ""}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            disabled={!selectedStateId || loadingDistricts}
                        >
                            <option value="">
                                {loadingDistricts ? "Loading Districts..." : "Select District"}
                            </option>
                            {districts.map((district) => (
                                <option key={district.id} value={String(district.id)}>
                                    {district.districtName}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <small className="text-danger">{errors.districtId?.message}</small>
            </div>

            {/* Village */}
            <div className="mb-3">
                <label className="form-label">Village</label>
                <Controller
                    name="villageId"
                    control={control}
                    rules={{ required: "Village is required" }}
                    render={({ field }) => (
                        <select
                            className="form-select"
                            value={field.value || ""}
                            onChange={(e) => handleVillageChange(e.target.value)}
                            disabled={!selectedDistrictId || loadingVillages}
                        >
                            <option value="">
                                {loadingVillages ? "Loading Villages..." : "Select Village"}
                            </option>
                            {villages.map((village) => (
                                <option key={village.id} value={String(village.id)}>
                                    {village.villageName}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <small className="text-danger">{errors.villageId?.message}</small>
            </div>

            {/* Family */}
            <div className="mb-3">
                <label className="form-label">Family</label>
                <Controller
                    name="familyId"
                    control={control}
                    rules={{ required: "Family is required" }}
                    render={({ field }) => (
                        <select
                            className="form-select"
                            value={field.value || ""}
                            onChange={(e) => field.onChange(e.target.value)}
                            disabled={!selectedVillageId || loadingFamilies}
                        >
                            <option value="">
                                {loadingFamilies ? "Loading Families..." : "Select Family"}
                            </option>
                            {families.map((family) => (
                                <option key={family.id} value={String(family.id)}>
                                    {family.familyHeadName}{" - "}{family.familyCode}
                                </option>
                            ))}
                        </select>
                    )}
                />
                <small className="text-danger">{errors.familyId?.message}</small>
            </div>

            {/* First Name / Last Name */}
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            First Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            {...register("firstName", {
                                required: "First Name is required"
                            })}
                        />

                        <small className="text-danger">
                            {errors.firstName?.message}
                        </small>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Last Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            {...register("lastName")}
                        />
                    </div>
                </div>
            </div>

            {/* Gender */}
            <div className="mb-3">
                <label className="form-label">Gender</label>

                <select
                    className="form-select"
                    {...register("gender", {
                        required: "Gender is required"
                    })}
                >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>

                <small className="text-danger">
                    {errors.gender?.message}
                </small>
            </div>

            {/* Date Of Birth / Birth Time / Alive */}
            <div className="row">
                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Date Of Birth
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            {...register("dateOfBirth", {
                                required: "Date of Birth is required"
                            })}
                        />

                        <small className="text-danger">
                            {errors.dateOfBirth?.message}
                        </small>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Birth Time
                        </label>

                        <input
                            type="time"
                            className="form-control"
                            {...register("birthTime")}
                        />
                    </div>
                </div>

                <div className="col-md-4 d-flex align-items-center">
                    <div className="form-check mt-2">
                        <Controller
                            name="alive"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={Boolean(field.value)}
                                    onChange={(e) => handleAliveChange(e.target.checked)}
                                />
                            )}
                        />

                        <label className="form-check-label">
                            Alive
                        </label>
                    </div>
                </div>
            </div>

            {/* Date Of Death */}
            {!alive && (
                <div className="mb-3">
                    <label className="form-label">
                        Date Of Death
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        {...register("dateOfDeath", {
                            required: "Date of Death is required"
                        })}
                    />

                    <small className="text-danger">
                        {errors.dateOfDeath?.message}
                    </small>
                </div>
            )}

            {/* Relationship */}
            <div className="mb-3">
                <label className="form-label">
                    Relationship
                </label>

                <select
                    className="form-select"
                    {...register("relationship", {
                        required: "Relationship is required"
                    })}
                >
                    <option value="">Select</option>
                    <option value="HEAD">Head</option>
                    <option value="SPOUSE">Spouse</option>
                    <option value="SON">Son</option>
                    <option value="DAUGHTER">Daughter</option>
                    <option value="FATHER">Father</option>
                    <option value="MOTHER">Mother</option>
                    <option value="BROTHER">Brother</option>
                    <option value="SISTER">Sister</option>
                    <option value="OTHER">Other</option>
                </select>

                <small className="text-danger">
                    {errors.relationship?.message}
                </small>
            </div>

            {/* Marital Status */}
            <div className="mb-3">
                <label className="form-label">
                    Marital Status
                </label>

                <select
                    className="form-select"
                    {...register("maritalStatus", {
                        required: "Marital Status is required"
                    })}
                >
                    <option value="">Select</option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOW">Widow</option>
                </select>

                <small className="text-danger">
                    {errors.maritalStatus?.message}
                </small>
            </div>

            {/* Mobile */}
            <div className="mb-3">
                <label className="form-label">Mobile No</label>

                <input
                    type="text"
                    maxLength="10"
                    className="form-control"
                    {...register("mobileNo")}
                />
            </div>

            {/* Aadhaar */}
            <div className="mb-3">
                <label className="form-label">Aadhaar No</label>

                <input
                    type="text"
                    maxLength="12"
                    className="form-control"
                    {...register("aadhaarNo")}
                />
            </div>

            {/* Occupation */}
            <div className="mb-3">
                <label className="form-label">Occupation</label>

                <input
                    type="text"
                    className="form-control"
                    {...register("occupation")}
                />
            </div>

            {/* Education */}
            <div className="mb-3">
                <label className="form-label">Education</label>

                <input
                    type="text"
                    className="form-control"
                    {...register("education")}
                />
            </div>

            {/* Gotra */}
            <div className="mb-3">
                <label className="form-label">Gotra</label>

                <Controller
                    name="gotra"
                    control={control}
                    render={({ field }) => (
                        <select
                            className="form-select"
                            value={field.value || ""}
                            onChange={(e) => handleGotraChange(e.target.value)}
                        >
                            <option value="">Select Gotra</option>
                            {gotras.map(gotra => (
                                <option key={gotra.gotraName} value={gotra.gotraName}>
                                    {gotra.gotraName}
                                </option>
                            ))}
                        </select>
                    )}
                />
            </div>

            {/* Pata */}
            <div className="mb-3">
                <label className="form-label">Pata</label>

                <input
                    type="text"
                    className="form-control"
                    {...register("pata")}
                    readOnly
                />
            </div>

            {/* Kuldevi */}
            <div className="mb-3">
                <label className="form-label">Kuldevi</label>

                <input
                    type="text"
                    className="form-control"
                    {...register("kuldevi")}
                />
            </div>

            {/* Buttons */}
            <div className="mt-4">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : member
                            ? "Update"
                            : "Save"}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default MemberForm;