import { useState } from 'react';
import { useForm } from 'react-hook-form'; 

export default function InvestOpForm() {
    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: {
            email: 'sarah@sarah.com'
        }
    });



    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div className="form-control">
                <label>Email</label>
                <input type="text" name="email" ref={register} />
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password" name="password" ref={register} />
            </div>
            <div className="form-control">
                <label></label>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}