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

            alive: true

        }

    });

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [families, setFamilies] = useState([]);

    const selectedStateId = watch("stateId");
    const selectedDistrictId = watch("districtId");
    const selectedVillageId = watch("villageId");
    const alive = watch("alive");

    useEffect(() => {

        loadStates();

    }, []);

    useEffect(() => {

        if (selectedStateId) {

            loadDistricts(selectedStateId);

        } else {

            setDistricts([]);
            setVillages([]);
            setFamilies([]);

        }

    }, [selectedStateId]);

    useEffect(() => {

        if (selectedDistrictId) {

            loadVillages(selectedDistrictId);

        } else {

            setVillages([]);
            setFamilies([]);

        }

    }, [selectedDistrictId]);

    useEffect(() => {

        if (selectedVillageId) {

            loadFamilies(selectedVillageId);

        } else {

            setFamilies([]);

        }

    }, [selectedVillageId]);

    useEffect(() => {

        if (member && states.length > 0) {

            loadEditData();

        }

    }, [member, states]);

    const loadStates = async () => {

        try {

            const response = await getStates();

            setStates(response.data.data);

        }

        catch (error) {

            toast.error("Failed to load states");

        }

    };

    const loadDistricts = async (stateId) => {

        try {

            const response =
                await getDistrictsByState(stateId);

            setDistricts(response.data.data);

        }

        catch (error) {

            toast.error("Failed to load districts");

        }

    };

    const loadVillages = async (districtId) => {

        try {

            const response =
                await getVillagesByDistrict(districtId);

            setVillages(response.data.data);

        }

        catch (error) {

            toast.error("Failed to load villages");

        }

    };

    const loadFamilies = async (villageId) => {

        try {

            const response =
                await getFamiliesByVillage(villageId);

            setFamilies(response.data.data);

        }

        catch (error) {

            toast.error("Failed to load families");

        }

    };

    const loadEditData = async () => {

        reset({

            stateId: String(member.stateId),
            districtId: "",
            villageId: "",
            familyId: "",

            memberCode: member.memberCode,
            firstName: member.firstName,
            lastName: member.lastName,
            gender: member.gender,
            dateOfBirth: member.dateOfBirth,

            alive: member.alive,

            dateOfDeath: member.dateOfDeath,

            relationship: member.relationship,

            maritalStatus: member.maritalStatus,

            mobileNo: member.mobileNo,

            aadhaarNo: member.aadhaarNo,

            occupation: member.occupation,

            education: member.education

        });

        await loadDistricts(member.stateId);

        setValue("districtId", String(member.districtId));

        await loadVillages(member.districtId);

        setValue("villageId", String(member.villageId));

        await loadFamilies(member.villageId);

        setValue("familyId", String(member.familyId));

    };
const onSubmit = async (data) => {

                    try {

                        if (member) {

                            await updateMember(member.id, data);

                            toast.success("Member updated successfully");

                        }

                        else {

                            await createMember(data);

                            toast.success("Member created successfully");

                        }

                        onSuccess();

                    }

                    catch (error) {

                        console.error(error);

                        toast.error(

                            member

                                ? "Failed to update member"

                                : "Failed to create member"

                        );

                    }

                };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            {/* State */}

            <div className="mb-3">

                <label className="form-label">
                    State
                </label>

                <select
                    className="form-select"
                    {...register("stateId", {
                        required: "State is required"
                    })}
                    onChange={(e) => {

                        setValue("stateId", e.target.value);

                        setValue("districtId", "");

                        setValue("villageId", "");

                        setValue("familyId", "");

                    }}
                >

                    <option value="">
                        Select State
                    </option>

                    {

                        states.map(state => (

                            <option
                                key={state.id}
                                value={state.id}
                            >

                                {state.stateName}

                            </option>

                        ))

                    }

                </select>

                <small className="text-danger">
                    {errors.stateId?.message}
                </small>

            </div>

            {/* District */}

            <div className="mb-3">

                <label className="form-label">
                    District
                </label>

                <select
                    className="form-select"
                    {...register("districtId", {
                        required: "District is required"
                    })}
                    onChange={(e) => {

                        setValue("districtId", e.target.value);

                        setValue("villageId", "");

                        setValue("familyId", "");

                    }}
                >

                    <option value="">
                        Select District
                    </option>

                    {

                        districts.map(district => (

                            <option
                                key={district.id}
                                value={district.id}
                            >

                                {district.districtName}

                            </option>

                        ))

                    }

                </select>

            </div>

            {/* Village */}

            <div className="mb-3">

                <label className="form-label">
                    Village
                </label>

                <select
                    className="form-select"
                    {...register("villageId", {
                        required: "Village is required"
                    })}
                    onChange={(e) => {

                        setValue("villageId", e.target.value);

                        setValue("familyId", "");

                    }}
                >

                    <option value="">
                        Select Village
                    </option>

                    {

                        villages.map(village => (

                            <option
                                key={village.id}
                                value={village.id}
                            >

                                {village.villageName}

                            </option>

                        ))

                    }

                </select>

            </div>

            {/* Family */}

            <div className="mb-3">

                <label className="form-label">
                    Family
                </label>

                <select
                    className="form-select"
                    {...register("familyId", {
                        required: "Family is required"
                    })}
                >

                    <option value="">
                        Select Family
                    </option>

                    {

                        families.map(family => (

                            <option
                                key={family.id}
                                value={family.id}
                            >

                                {family.familyHeadName}

                            </option>

                        ))

                    }

                </select>

            </div>

            <div className="row">

                <div className="col-md-6">

                    <div className="mb-3">

                        <label className="form-label">
                            Member Code
                        </label>

                        <input
                            className="form-control"
                            {...register("memberCode", {
                                required: "Member Code is required"
                            })}
                        />

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="mb-3">

                        <label className="form-label">
                            First Name
                        </label>

                        <input
                            className="form-control"
                            {...register("firstName", {
                                required: "First Name is required"
                            })}
                        />

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-md-6">

                    <div className="mb-3">

                        <label className="form-label">
                            Last Name
                        </label>

                        <input
                            className="form-control"
                            {...register("lastName")}
                        />

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="mb-3">

                        <label className="form-label">
                            Gender
                        </label>

                        <select
                            className="form-select"
                            {...register("gender")}
                        >

                            <option value="MALE">Male</option>

                            <option value="FEMALE">Female</option>

                            <option value="OTHER">Other</option>

                        </select>

                    </div>

                </div>

            </div>
                        {/* Date Of Birth */}

                        <div className="row">

                            <div className="col-md-6">

                                <div className="mb-3">

                                    <label className="form-label">
                                        Date Of Birth
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        {...register("dateOfBirth")}
                                    />

                                </div>

                            </div>

                            <div className="col-md-6 d-flex align-items-center">

                                <div className="form-check mt-4">

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

                        {/* Date Of Death */}

                        {

                            !alive && (

                                <div className="mb-3">

                                    <label className="form-label">

                                        Date Of Death

                                    </label>

                                    <input

                                        type="date"

                                        className="form-control"

                                        {...register("dateOfDeath")}

                                    />

                                </div>

                            )

                        }

                        {/* Relationship */}

                        <div className="mb-3">

                            <label className="form-label">

                                Relationship

                            </label>

                            <select

                                className="form-select"

                                {...register("relationship")}

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

                        </div>

                        {/* Marital Status */}

                        <div className="mb-3">

                            <label className="form-label">

                                Marital Status

                            </label>

                            <select

                                className="form-select"

                                {...register("maritalStatus")}

                            >

                                <option value="">Select</option>

                                <option value="SINGLE">Single</option>

                                <option value="MARRIED">Married</option>

                                <option value="DIVORCED">Divorced</option>

                                <option value="WIDOW">Widow</option>

                            </select>

                        </div>

                        {/* Mobile */}

                        <div className="mb-3">

                            <label className="form-label">

                                Mobile No

                            </label>

                            <input

                                className="form-control"

                                {...register("mobileNo")}

                            />

                        </div>

                        {/* Aadhaar */}

                        <div className="mb-3">

                            <label className="form-label">

                                Aadhaar No

                            </label>

                            <input

                                className="form-control"

                                {...register("aadhaarNo")}

                            />

                        </div>

                        {/* Occupation */}

                        <div className="mb-3">

                            <label className="form-label">

                                Occupation

                            </label>

                            <input

                                className="form-control"

                                {...register("occupation")}

                            />

                        </div>

                        {/* Education */}

                        <div className="mb-3">

                            <label className="form-label">

                                Education

                            </label>

                            <input

                                className="form-control"

                                {...register("education")}

                            />

                        </div>

                        <button

                            className="btn btn-primary"

                            type="submit"

                        >

                            {

                                member

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

                    </form>

                );

            }

            export default MemberForm;