import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createState, updateState } from "../../services/stateService";

function StateForm({ state, onSuccess, onClose }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {

        if (state) {

            reset({
                stateCode: state.stateCode,
                stateName: state.stateName
            });

        } else {

            reset({
                stateCode: "",
                stateName: ""
            });

        }

    }, [state, reset]);

    const onSubmit = async (data) => {

        try {

            if (state) {

                await updateState(state.id, data);

            } else {

                await createState(data);

            }

            onSuccess();

        } catch (error) {

            console.error(error);

            alert(state ? "Failed to update state" : "Failed to create state");

        }

    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-3">

                <label className="form-label">
                    State Code
                </label>

                <input
                    className="form-control"
                    {...register("stateCode", {
                        required: "State Code is required"
                    })}
                />

                <small className="text-danger">
                    {errors.stateCode?.message}
                </small>

            </div>

            <div className="mb-3">

                <label className="form-label">
                    State Name
                </label>

                <input
                    className="form-control"
                    {...register("stateName", {
                        required: "State Name is required"
                    })}
                />

                <small className="text-danger">
                    {errors.stateName?.message}
                </small>

            </div>

            <button
                className="btn btn-primary"
                type="submit">

                {state ? "Update" : "Save"}

            </button>

            <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={onClose}>

                Cancel

            </button>

        </form>

    );

}

export default StateForm;