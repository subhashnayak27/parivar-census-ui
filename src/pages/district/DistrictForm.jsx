import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
    createDistrict,
    updateDistrict
} from "../../services/districtService";

import { getStates } from "../../services/stateService";

function DistrictForm({

    district,
    onSuccess,
    onClose

}) {

    const {

        register,
        handleSubmit,
        reset,
        formState: { errors }

    } = useForm();

    const [states, setStates] = useState([]);

    useEffect(() => {

        loadStates();

    }, []);

    useEffect(() => {

        if (states.length === 0) return;

        if (district) {

            reset({

                stateId: String(district.stateId),
                districtCode: district.districtCode,
                districtName: district.districtName

            });

        } else {

            reset({

                stateId: "",
                districtCode: "",
                districtName: ""

            });

        }

    }, [district, states, reset]);

    const loadStates = async () => {

        try {

            const response = await getStates({
                page: 0,
                size: 1000,
                sortBy: "id",
                direction: "asc"
            });

            setStates(response.data.data.content);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load states");

        }

    };

    const onSubmit = async (data) => {

        try {

            if (district) {

                await updateDistrict(district.id, data);

                toast.success("District updated successfully");

            }

            else {

                await createDistrict(data);

                toast.success("District created successfully");

            }

            onSuccess();

        }

        catch (error) {

            console.error(error);

            toast.error(

                district
                    ? "Failed to update district"
                    : "Failed to create district"

            );

        }

    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">

                <label className="form-label">

                    State

                </label>

                <select

                    className="form-select"

                    {...register("stateId", {

                        required: "State is required"

                    })}

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

            <div className="mb-3">

                <label className="form-label">

                    District Code

                </label>

                <input

                    className="form-control"

                    {...register("districtCode", {

                        required: "District Code is required"

                    })}

                />

                <small className="text-danger">

                    {errors.districtCode?.message}

                </small>

            </div>

            <div className="mb-3">

                <label className="form-label">

                    District Name

                </label>

                <input

                    className="form-control"

                    {...register("districtName", {

                        required: "District Name is required"

                    })}

                />

                <small className="text-danger">

                    {errors.districtName?.message}

                </small>

            </div>

            <button

                className="btn btn-primary"

                type="submit"

            >

                {

                    district
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

export default DistrictForm;