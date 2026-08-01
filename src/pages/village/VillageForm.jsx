import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    createVillage,
    updateVillage
} from "../../services/villageService";

import { getStates } from "../../services/stateService";
import { getDistrictsByState } from "../../services/districtService";

function VillageForm({

    village,
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

    const selectedStateId = watch("stateId");

    useEffect(() => {

        loadStates();

    }, []);

    useEffect(() => {

        if (selectedStateId) {

            loadDistricts(selectedStateId);

        } else {

            setDistricts([]);

        }

    }, [selectedStateId]);

    useEffect(() => {

        if (!village || states.length === 0) {

            reset({

                stateId: "",

                districtId: "",

                villageCode: "",

                villageName: "",

                postalCode: ""

            });

            setDistricts([]);

            return;

        }

        const loadEditData = async () => {

            try {

                const response = await getDistrictsByState(village.stateId);

                setDistricts(response.data.data);

                reset({

                    stateId: String(village.stateId),

                    districtId: String(village.districtId),

                    villageCode: village.villageCode,

                    villageName: village.villageName,

                    postalCode: village.postalCode

                });

            }

            catch (error) {

                console.error(error);

            }

        };

        loadEditData();

    }, [village, states, reset]);

    const loadStates = async () => {

        try {

            const response = await getStates();

            setStates(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load states");

        }

    };

    const loadDistricts = async (stateId) => {

        try {

            const response = await getDistrictsByState(stateId);

            setDistricts(response.data.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load districts");

        }

    };

    const onSubmit = async (data) => {

        try {

            if (village) {

                await updateVillage(village.id, data);

                toast.success("Village updated successfully");

            }

            else {

                await createVillage(data);

                toast.success("Village created successfully");

            }

            onSuccess();

        }

        catch (error) {

            console.error(error);

            toast.error(

                village
                    ? "Failed to update village"
                    : "Failed to create village"

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

                <small className="text-danger">

                    {errors.districtId?.message}

                </small>

            </div>

            {/* Village Code */}

            <div className="mb-3">

                <label className="form-label">

                    Village Code

                </label>

                <input

                    className="form-control"

                    {...register("villageCode", {

                        required: "Village Code is required"

                    })}

                />

                <small className="text-danger">

                    {errors.villageCode?.message}

                </small>

            </div>

            {/* Village Name */}

            <div className="mb-3">

                <label className="form-label">

                    Village Name

                </label>

                <input

                    className="form-control"

                    {...register("villageName", {

                        required: "Village Name is required"

                    })}

                />

                <small className="text-danger">

                    {errors.villageName?.message}

                </small>

            </div>

            {/* Postal Code */}

            <div className="mb-3">

                <label className="form-label">

                    Postal Code

                </label>

                <input

                    className="form-control"

                    {...register("postalCode", {

                        required: "Postal Code is required",

                        pattern: {

                            value: /^[0-9]{6}$/,

                            message: "Postal Code must be 6 digits"

                        }

                    })}

                />

                <small className="text-danger">

                    {errors.postalCode?.message}

                </small>

            </div>

            <button
                className="btn btn-primary"
                type="submit"
            >

                {village ? "Update" : "Save"}

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

export default VillageForm;