import React from 'react';
import { useForm } from "react-hook-form";

import firebase from "firebase/app";
import "firebase/analytics";

firebase.analytics();

const UserForm = () => {
    const { register, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        localStorage.setItem('userData', JSON.stringify(data));
        e.target.reset();
        console.log(data);
    };

    const id  = Math.ceil(Math.random() * 10000);

    const show = id =>{
        document.getElementById(id).style.display = 'block';
    }
    const hide = id =>{
        document.getElementById(id).style.display = 'none';
    }

    const nameClick=()=>{
        show('name');
    }
    const emailClick=()=>{
        show('email')
    }
    const mobileClick=()=>{
        show('mobile');
    }
    const passwordClick=()=>{
        show('password');
    }
    const dateClick=()=>{
        show('date');
    }
    const clubClick=()=>{
        show('club');
    }
    const showClick=()=>{
        show('name');
        show('email');
        show('mobile');
        show('password');
        show('date');
        show('club');
    }
    const hideClick=()=>{
        hide('name');
        hide('email');
        hide('mobile');
        hide('password');
        hide('date');
        hide('club');
    }


    return (
        <div style={{display:'flex'}}>
            
            <form onSubmit={handleSubmit(onSubmit)} style={{width:"50%", borderRight:'1px solid lightGrey'}}>
                <h6>Fill all the blank form</h6>
                
                <div style={{display:'block'}} >
                    <label for="id">User Id</label>
                    <input type="number" id="id" name="id" ref={register} value={id}/>
                </div><br/>

                <div className="form-control" style={{display:'none'}} show={false} id="name">
                    <label for="name">Name</label>
                    <input type="text"  name="name" ref={register} />
                </div><br/>

                <div className="form-control" style={{display:'none'}} id='email'>
                    <label for='email'>Email</label>
                    <input type="email" name="email"  ref={register} />
                </div><br/>

                <div className="form-control" style={{display:'none'}} id='mobile'>
                    <label for='mobile'>Mobile</label>
                    <input type="text" name="mobile"  ref={register} minlength='11' />
                </div><br/>

                <div className="form-control" style={{display:'none'}} id='password'>
                    <label for='password'>Password</label>
                    <input type="password" name="password"  ref={register} />
                </div><br/>

                <div className="form-control" style={{display:'none'}} id='date'>
                    <label for='date'>Birthday</label>
                    <input type="date" name="date"  ref={register}  />
                </div><br/>

                <div className="form-control" style={{display:'none'}} id='club'>
                    <label for='club'>Reason to join</label>
                    <textarea name="club"  ref={register} />
                </div>
                <br/>

                <div className="form-control">
                    <input type="submit" value="Submit"/>
                </div>
            </form>

            <div style={{width:"50%", paddingLeft:'50px'}}>
                <h6>Select all the button to generate full form</h6>
                <div style={{display:"flex", padding:'10px', textAlign: 'center'}}>
                    <button onClick={handleSubmit(nameClick)}>Name</button>
                    <button onClick={handleSubmit(emailClick)}>Email</button>
                    
                </div>
                <div style={{display:"flex", padding:'10px'}}>
                    <button onClick={handleSubmit(mobileClick)}>Mobile</button>
                    <button onClick={handleSubmit(passwordClick)}>Password</button>
                </div>
                <div style={{display:"flex", padding:'10px'}}>
                    <button onClick={handleSubmit(dateClick)}>Date</button>
                    <button onClick={handleSubmit(clubClick)}>Info</button>
                </div>
                <div style={{display:"flex", padding:'10px'}}>
                    <button onClick={handleSubmit(showClick)}>Show All</button>
                </div>
                <div style={{display:"flex", padding:'10px'}}>
                    <button onClick={handleSubmit(hideClick)}>Clear All</button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;