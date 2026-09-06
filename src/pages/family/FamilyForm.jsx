import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    createFamily,
    updateFamily
} from "../../services/familyService";

import { getStates } from "../../services/stateService";
import { getDistrictsByState } from "../../services/districtService";
import { getVillagesByDistrict } from "../../services/villageService";

function FamilyForm({

    family,
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

    } = useForm();

    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const selectedStateId = watch("stateId");
    const selectedDistrictId = watch("districtId");

    useEffect(() => {

        loadStates();

    }, []);

    useEffect(() => {

        if (selectedStateId) {

            loadDistricts(selectedStateId);

            setValue("districtId", "");
            setValue("villageId", "");

        } else {

            setDistricts([]);
            setVillages([]);

        }

    }, [selectedStateId]);

    useEffect(() => {

        if (selectedDistrictId) {

            loadVillages(selectedDistrictId);

            setValue("villageId", "");

        } else {

            setVillages([]);

        }

    }, [selectedDistrictId]);

    useEffect(() => {

        if (!family) {

            reset({

                stateId: "",
                districtId: "",
                villageId: "",
                familyHeadName: "",
                address: "",
                mobileNo: "",
                rationCardNo: ""

            });

            return;

        }

        loadEditData();
    }, [family, states]);

    const loadEditData = async () => {

        try {

            reset({
                stateId: String(family.stateId),
                districtId: "",
                villageId: "",
                familyHeadName: family.familyHeadName || "",
                address: family.address || "",
                mobileNo: family.mobileNo || "",
                rationCardNo: family.rationCardNo || ""
            });

            // Load districts
            const districtResponse =
                await getDistrictsByState(family.stateId);

            setDistricts(districtResponse.data.data);

            setValue(
                "districtId",
                String(family.districtId)
            );

            // Load villages
            const villageResponse =
                await getVillagesByDistrict(family.districtId);

            setVillages(villageResponse.data.data);

            setValue(
                "villageId",
                String(family.villageId)
            );

        } catch (error) {

            console.error(
                "Failed to load family edit data",
                error
            );

        }

    };

    const loadStates = async () => {

        try {

            const response = await getStates({
                page: 0,
                size: 1000,
                sortBy: "id",
                direction: "asc"
            });

            setStates(response.data.data.content);

        } catch (error) {

            console.error("Failed to load states", error);

            toast.error("Failed to load states");

        }

    };

    const loadDistricts = async (stateId) => {

        try {

            const response = await getDistrictsByState(stateId);

            setDistricts(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load districts");

        }

    };

    const loadVillages = async (districtId) => {

        try {

            const response = await getVillagesByDistrict(districtId);

            setVillages(response.data.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load villages");

        }

    };

    const onSubmit = async (data) => {

        try {

            if (family) {

                await updateFamily(family.id, data);

                toast.success("Family updated successfully");

            } else {

                await createFamily(data);

                toast.success("Family created successfully");

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            toast.error(

                family
                    ? "Failed to update family"
                    : "Failed to create family"

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

                   }}
               >

                    <option value="">Select State</option>

                    {

                        states.map(state => (

                            <option
                                key={state.id}
                                value={String(state.id)}
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

                     }}
                 >

                    <option value="">Select District</option>

                    {

                        districts.map(district => (

                            <option
                                key={district.id}
                                value={String(district.id)}
                            >

                                {district.districtName}

                            </option>

                        ))

                    }

                </select>

                <small className="text-danger">

                    {errors.districtId?.message}

                </small>

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

                >

                    <option value="">Select Village</option>

                    {

                        villages.map(village => (

                            <option
                                key={village.id}
                                value={String(village.id)}
                            >

                                {village.villageName}

                            </option>

                        ))

                    }

                </select>

                <small className="text-danger">

                    {errors.villageId?.message}

                </small>

            </div>

            {/* Head Name */}

            <div className="mb-3">

                <label className="form-label">

                    Family Head Name

                </label>

                <input

                    className="form-control"

                    {...register("familyHeadName", {

                        required: "Family Head Name is required"

                    })}

                />

            </div>

            {/* Address */}

            <div className="mb-3">

                <label className="form-label">

                    Address

                </label>

                <textarea

                    rows="3"

                    className="form-control"

                    {...register("address", {

                        required: "Address is required"

                    })}

                />

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

            {/* Ration Card */}

            <div className="mb-3">

                <label className="form-label">

                    Ration Card No

                </label>

                <input

                    className="form-control"

                    {...register("rationCardNo")}

                />

            </div>

            <button

                className="btn btn-primary"

                type="submit"

            >

                {family ? "Update" : "Save"}

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

export default FamilyForm;