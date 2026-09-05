import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    createMember,
    updateMember
} from "../../services/memberService";

import { getStates } from "../../services/stateService";
import { getDistrictsByState } from "../../services/districtService";
import { getVillagesByDistrict } from "../../services/villageService";
import { getFamiliesByVillage } from "../../services/familyService";


/* =========================================================
   Gotra Master
========================================================= */

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


/* =========================================================
   Component
========================================================= */

function MemberForm({
    member,
    onSuccess,
    onClose
}) {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({

        defaultValues: {
            stateId: "",
            districtId: "",
            villageId: "",
            familyId: "",

            firstName: "",
            lastName: "",

            gender: "",
            dateOfBirth: "",

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
        }
    });


    /* =====================================================
       Dropdown State
    ===================================================== */

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


    /* =====================================================
       Load States
    ===================================================== */

    useEffect(() => {

        loadStates();

    }, []);


    const loadStates = async () => {

        try {

            setLoadingStates(true);

            const response = await getStates({
                page: 0,
                size: 1000,
                sortBy: "id",
                direction: "asc"
            });

            const data = response?.data?.data;

            /*
             * Your API returns paginated state data:
             *
             * {
             *    data: {
             *       content: [...]
             *    }
             * }
             */

            const stateList = Array.isArray(data)
                ? data
                : data?.content || [];

            setStates(stateList);

        } catch (error) {

            console.error("Failed to load states", error);

            toast.error("Failed to load states");

        } finally {

            setLoadingStates(false);

        }
    };


    /* =====================================================
       Load Districts
    ===================================================== */

    const loadDistricts = async (stateId) => {

        if (!stateId) {

            setDistricts([]);
            return [];

        }

        try {

            setLoadingDistricts(true);

            const response =
                await getDistrictsByState(stateId);

            const districtList =
                response?.data?.data || [];

            setDistricts(districtList);

            return districtList;

        } catch (error) {

            console.error(
                "Failed to load districts",
                error
            );

            toast.error("Failed to load districts");

            setDistricts([]);

            return [];

        } finally {

            setLoadingDistricts(false);

        }
    };


    /* =====================================================
       Load Villages
    ===================================================== */

    const loadVillages = async (districtId) => {

        if (!districtId) {

            setVillages([]);
            return [];

        }

        try {

            setLoadingVillages(true);

            const response =
                await getVillagesByDistrict(districtId);

            const villageList =
                response?.data?.data || [];

            setVillages(villageList);

            return villageList;

        } catch (error) {

            console.error(
                "Failed to load villages",
                error
            );

            toast.error("Failed to load villages");

            setVillages([]);

            return [];

        } finally {

            setLoadingVillages(false);

        }
    };


    /* =====================================================
       Load Families
    ===================================================== */

    const loadFamilies = async (villageId) => {

        if (!villageId) {

            setFamilies([]);
            return [];

        }

        try {

            setLoadingFamilies(true);

            const response =
                await getFamiliesByVillage(villageId);

            const familyList =
                response?.data?.data || [];

            setFamilies(familyList);

            return familyList;

        } catch (error) {

            console.error(
                "Failed to load families",
                error
            );

            toast.error("Failed to load families");

            setFamilies([]);

            return [];

        } finally {

            setLoadingFamilies(false);

        }
    };


    /* =====================================================
       Normal User Selection - State
    ===================================================== */

    const handleStateChange = async (event) => {

        const stateId = event.target.value;

        setValue("stateId", stateId);

        /*
         * Clear dependent dropdowns.
         */

        setValue("districtId", "");
        setValue("villageId", "");
        setValue("familyId", "");

        setDistricts([]);
        setVillages([]);
        setFamilies([]);

        if (!stateId) {
            return;
        }

        await loadDistricts(stateId);
    };


    /* =====================================================
       Normal User Selection - District
    ===================================================== */

    const handleDistrictChange = async (event) => {

        const districtId = event.target.value;

        setValue("districtId", districtId);

        /*
         * Clear dependent dropdowns.
         */

        setValue("villageId", "");
        setValue("familyId", "");

        setVillages([]);
        setFamilies([]);

        if (!districtId) {
            return;
        }

        await loadVillages(districtId);
    };


    /* =====================================================
       Normal User Selection - Village
    ===================================================== */

    const handleVillageChange = async (event) => {

        const villageId = event.target.value;

        setValue("villageId", villageId);

        /*
         * Clear family when village changes.
         */

        setValue("familyId", "");

        setFamilies([]);

        if (!villageId) {
            return;
        }

        await loadFamilies(villageId);
    };


    /* =====================================================
       Gotra Change
    ===================================================== */

    const handleGotraChange = (event) => {

        const gotraName = event.target.value;

        setValue("gotra", gotraName);

        const gotraObj =
            gotras.find(
                item => item.gotraName === gotraName
            );

        setValue(
            "pata",
            gotraObj ? gotraObj.pata : ""
        );
    };


    /* =====================================================
       EDIT MEMBER

       Important:
       We do NOT depend on the cascading useEffects here.

       We load everything in correct sequence:

       State
          ↓
       District
          ↓
       Village
          ↓
       Family

       Then populate the form.
    ===================================================== */

    useEffect(() => {

        if (!member) {

            reset({

                stateId: "",
                districtId: "",
                villageId: "",
                familyId: "",

                firstName: "",
                lastName: "",

                gender: "",
                dateOfBirth: "",

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
            });

            setDistricts([]);
            setVillages([]);
            setFamilies([]);

            return;
        }


        /*
         * Wait until states are loaded.
         */

        if (states.length === 0) {
            return;
        }


        loadEditData();

    }, [member, states]);


    const loadEditData = async () => {

        try {

            console.log(
                "Loading member for edit:",
                member
            );


            /* =========================================
               Extract IDs safely
            ========================================= */

            const stateId =
                member?.stateId != null
                    ? String(member.stateId)
                    : "";

            const districtId =
                member?.districtId != null
                    ? String(member.districtId)
                    : "";

            const villageId =
                member?.villageId != null
                    ? String(member.villageId)
                    : "";

            const familyId =
                member?.familyId != null
                    ? String(member.familyId)
                    : "";


            console.log("Edit hierarchy:", {
                stateId,
                districtId,
                villageId,
                familyId
            });


            /* =========================================
               STEP 1
               Set basic member information
            ========================================= */

            reset({

                stateId,

                districtId: "",
                villageId: "",
                familyId: "",

                firstName: member.firstName || "",
                lastName: member.lastName || "",

                gender: member.gender || "",

                dateOfBirth:
                    member.dateOfBirth || "",

                alive:
                    member.alive !== undefined
                        ? member.alive
                        : true,

                dateOfDeath:
                    member.dateOfDeath || "",

                relationship:
                    member.relationship || "",

                maritalStatus:
                    member.maritalStatus || "",

                mobileNo:
                    member.mobileNo || "",

                aadhaarNo:
                    member.aadhaarNo || "",

                occupation:
                    member.occupation || "",

                education:
                    member.education || "",

                gotra:
                    member.gotra || "",

                pata:
                    member.pata || "",

                kuldevi:
                    member.kuldevi || ""
            });


            /* =========================================
               STEP 2
               Load Districts
            ========================================= */

            if (stateId) {

                const districtList =
                    await loadDistricts(stateId);

                /*
                 * Only set district if it exists
                 * in returned list.
                 */

                const districtExists =
                    districtList.some(
                        item =>
                            String(item.id) === districtId
                    );

                if (districtExists) {

                    setValue(
                        "districtId",
                        districtId
                    );

                } else {

                    console.warn(
                        "District not found:",
                        districtId
                    );
                }
            }


            /* =========================================
               STEP 3
               Load Villages
            ========================================= */

            if (districtId) {

                const villageList =
                    await loadVillages(districtId);

                const villageExists =
                    villageList.some(
                        item =>
                            String(item.id) === villageId
                    );

                if (villageExists) {

                    setValue(
                        "villageId",
                        villageId
                    );

                } else {

                    console.warn(
                        "Village not found:",
                        villageId
                    );
                }
            }


            /* =========================================
               STEP 4
               Load Families
            ========================================= */

            if (villageId) {

                const familyList =
                    await loadFamilies(villageId);

                const familyExists =
                    familyList.some(
                        item =>
                            String(item.id) === familyId
                    );

                if (familyExists) {

                    setValue(
                        "familyId",
                        familyId
                    );

                } else {

                    console.warn(
                        "Family not found:",
                        familyId
                    );
                }
            }


            console.log(
                "Member edit data loaded successfully"
            );

        } catch (error) {

            console.error(
                "Failed to load member edit data",
                error
            );

            toast.error(
                "Failed to load member details"
            );
        }
    };


    /* =====================================================
       Submit
    ===================================================== */

    const onSubmit = async (data) => {

        try {

            /*
             * Ensure boolean value for alive.
             */

            data.alive =
                data.alive === true ||
                data.alive === "true";


            /*
             * If member is alive, remove date of death.
             */

            if (data.alive) {

                data.dateOfDeath = null;

            }


            console.log(
                "Submitting member:",
                data
            );


            if (member) {

                await updateMember(
                    member.id,
                    data
                );

                toast.success(
                    "Member updated successfully"
                );

            } else {

                await createMember(data);

                toast.success(
                    "Member created successfully"
                );
            }


            onSuccess();

        } catch (error) {

            console.error(
                "Member save failed",
                error
            );

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


    /* =====================================================
       Render
    ===================================================== */

    return (

        <form onSubmit={handleSubmit(onSubmit)}>


            {/* =================================================
                State
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    State
                </label>

                <select
                    className="form-select"
                    {...register("stateId", {
                        required: "State is required"
                    })}
                    onChange={handleStateChange}
                >

                    <option value="">
                        Select State
                    </option>

                    {states.map(state => (

                        <option
                            key={state.id}
                            value={state.id}
                        >
                            {state.stateName}
                        </option>

                    ))}

                </select>

                {loadingStates && (
                    <small className="text-muted">
                        Loading states...
                    </small>
                )}

                <small className="text-danger">
                    {errors.stateId?.message}
                </small>

            </div>


            {/* =================================================
                District
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    District
                </label>

                <select
                    className="form-select"
                    {...register("districtId", {
                        required: "District is required"
                    })}
                    onChange={handleDistrictChange}
                    disabled={
                        !selectedStateId ||
                        loadingDistricts
                    }
                >

                    <option value="">
                        {loadingDistricts
                            ? "Loading Districts..."
                            : "Select District"
                        }
                    </option>

                    {districts.map(district => (

                        <option
                            key={district.id}
                            value={district.id}
                        >
                            {district.districtName}
                        </option>

                    ))}

                </select>

                <small className="text-danger">
                    {errors.districtId?.message}
                </small>

            </div>


            {/* =================================================
                Village
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Village
                </label>

                <select
                    className="form-select"
                    {...register("villageId", {
                        required: "Village is required"
                    })}
                    onChange={handleVillageChange}
                    disabled={
                        !selectedDistrictId ||
                        loadingVillages
                    }
                >

                    <option value="">
                        {loadingVillages
                            ? "Loading Villages..."
                            : "Select Village"
                        }
                    </option>

                    {villages.map(village => (

                        <option
                            key={village.id}
                            value={village.id}
                        >
                            {village.villageName}
                        </option>

                    ))}

                </select>

                <small className="text-danger">
                    {errors.villageId?.message}
                </small>

            </div>


            {/* =================================================
                Family
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Family
                </label>

                <select
                    className="form-select"
                    {...register("familyId", {
                        required: "Family is required"
                    })}
                    disabled={
                        !selectedVillageId ||
                        loadingFamilies
                    }
                >

                    <option value="">
                        {loadingFamilies
                            ? "Loading Families..."
                            : "Select Family"
                        }
                    </option>

                    {families.map(familyItem => (

                        <option
                            key={familyItem.id}
                            value={familyItem.id}
                        >
                            {familyItem.familyHeadName}
                            {" - "}
                            {familyItem.familyCode}
                        </option>

                    ))}

                </select>

                <small className="text-danger">
                    {errors.familyId?.message}
                </small>

            </div>


            {/* =================================================
                First Name / Last Name
            ================================================= */}

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
                                required:
                                    "First Name is required"
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


            {/* =================================================
                Gender
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Gender
                </label>

                <select
                    className="form-select"
                    {...register("gender", {
                        required: "Gender is required"
                    })}
                >

                    <option value="">
                        Select Gender
                    </option>

                    <option value="MALE">
                        Male
                    </option>

                    <option value="FEMALE">
                        Female
                    </option>

                    <option value="OTHER">
                        Other
                    </option>

                </select>

                <small className="text-danger">
                    {errors.gender?.message}
                </small>

            </div>


            {/* =================================================
                Date Of Birth / Alive
            ================================================= */}

            <div className="row">

                <div className="col-md-6">

                    <div className="mb-3">

                        <label className="form-label">
                            Date Of Birth
                        </label>

                        <input
                            type="date"
                            className="form-control"
                            {...register("dateOfBirth", {
                                required:
                                    "Date of Birth is required"
                            })}
                        />

                        <small className="text-danger">
                            {errors.dateOfBirth?.message}
                        </small>

                    </div>

                </div>


                <div className="col-md-6 d-flex align-items-center">

                    <div className="form-check mt-2">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            {...register("alive")}
                        />

                        <label className="form-check-label">
                            Alive
                        </label>

                    </div>

                </div>

            </div>


            {/* =================================================
                Date Of Death
            ================================================= */}

            {!alive && (

                <div className="mb-3">

                    <label className="form-label">
                        Date Of Death
                    </label>

                    <input
                        type="date"
                        className="form-control"
                        {...register("dateOfDeath", {
                            required:
                                "Date of Death is required"
                        })}
                    />

                    <small className="text-danger">
                        {errors.dateOfDeath?.message}
                    </small>

                </div>

            )}


            {/* =================================================
                Relationship
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Relationship
                </label>

                <select
                    className="form-select"
                    {...register("relationship", {
                        required:
                            "Relationship is required"
                    })}
                >

                    <option value="">
                        Select
                    </option>

                    <option value="HEAD">
                        Head
                    </option>

                    <option value="SPOUSE">
                        Spouse
                    </option>

                    <option value="SON">
                        Son
                    </option>

                    <option value="DAUGHTER">
                        Daughter
                    </option>

                    <option value="FATHER">
                        Father
                    </option>

                    <option value="MOTHER">
                        Mother
                    </option>

                    <option value="BROTHER">
                        Brother
                    </option>

                    <option value="SISTER">
                        Sister
                    </option>

                    <option value="OTHER">
                        Other
                    </option>

                </select>

                <small className="text-danger">
                    {errors.relationship?.message}
                </small>

            </div>


            {/* =================================================
                Marital Status
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Marital Status
                </label>

                <select
                    className="form-select"
                    {...register("maritalStatus", {
                        required:
                            "Marital Status is required"
                    })}
                >

                    <option value="">
                        Select
                    </option>

                    <option value="SINGLE">
                        Single
                    </option>

                    <option value="MARRIED">
                        Married
                    </option>

                    <option value="DIVORCED">
                        Divorced
                    </option>

                    <option value="WIDOW">
                        Widow
                    </option>

                </select>

                <small className="text-danger">
                    {errors.maritalStatus?.message}
                </small>

            </div>


            {/* =================================================
                Mobile
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Mobile No
                </label>

                <input
                    type="text"
                    maxLength="10"
                    className="form-control"
                    {...register("mobileNo")}
                />

            </div>


            {/* =================================================
                Aadhaar
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Aadhaar No
                </label>

                <input
                    type="text"
                    maxLength="12"
                    className="form-control"
                    {...register("aadhaarNo")}
                />

            </div>


            {/* =================================================
                Occupation
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Occupation
                </label>

                <input
                    type="text"
                    className="form-control"
                    {...register("occupation")}
                />

            </div>


            {/* =================================================
                Education
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Education
                </label>

                <input
                    type="text"
                    className="form-control"
                    {...register("education")}
                />

            </div>


            {/* =================================================
                Gotra
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Gotra
                </label>

                <select
                    className="form-select"
                    {...register("gotra")}
                    value={selectedGotra || ""}
                    onChange={handleGotraChange}
                >

                    <option value="">
                        Select Gotra
                    </option>

                    {gotras.map((gotra, index) => (

                        <option
                            key={index}
                            value={gotra.gotraName}
                        >
                            {gotra.gotraName}
                        </option>

                    ))}

                </select>

            </div>


            {/* =================================================
                Pata
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Pata
                </label>

                <input
                    type="text"
                    className="form-control"
                    {...register("pata")}
                    readOnly
                />

            </div>


            {/* =================================================
                Kuldevi
            ================================================= */}

            <div className="mb-3">

                <label className="form-label">
                    Kuldevi
                </label>

                <input
                    type="text"
                    className="form-control"
                    {...register("kuldevi")}
                />

            </div>


            {/* =================================================
                Buttons
            ================================================= */}

            <div className="mt-4">

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    {member
                        ? "Update"
                        : "Save"
                    }
                </button>


                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={onClose}
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}


export default MemberForm;