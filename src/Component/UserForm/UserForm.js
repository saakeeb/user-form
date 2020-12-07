import React from 'react';
import { useForm } from "react-hook-form";

const UserForm = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        localStorage.setItem('userData', JSON.stringify(data));
        e.target.reset();
        console.log(data);
      };
      const id  = Math.ceil(Math.random() * 10000);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label for="id">User Id</label>
                    <input type="number" id="id" name="id" ref={register} value={id}/>
                </div><br/>

                <div className="form-control">
                    <label for="name">User Name</label>
                    <input type="text" id="name" name="name" ref={register} required/>
                </div><br/>

                <div className="form-control">
                    <label for='email'>Email</label>
                    <input type="email" name="email" id='email' ref={register} required/>
                </div><br/>

                <div className="form-control">
                    <label for='mobile'>Mobile</label>
                    <input type="text" name="mobile" id='mobile' ref={register} minlength='11' required/>
                </div><br/>

                <div className="form-control">
                    <label for='password'>Password</label>
                    <input type="password" name="password" id='password' ref={register} required/>
                </div><br/>

                <div className="form-control">
                    <label for='date'>Birthday</label>
                    <input type="date" name="date" id='date' ref={register}  required/>
                </div><br/>

                <div className="form-control">
                    <label for='club'>Reason to join</label>
                    <textarea name="club" id='club' ref={register} required/>
                </div>
                <br/>

                <div className="form-control">
                    <label></label>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;