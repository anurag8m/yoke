import axios from 'axios';

export const register = newUser => {
    return axios
        .post("users/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log("Registered!");
        });
};

export const login = user => {
    return axios
        .post("/newlogin", {
            phone: user.phone,
            pass: user.password
        })
        .then(res => {
            localStorage.setItem("usertoken", res.data);
            return res.data;
        })
        .catch(err => {

            console.log(err.response.data.msg);

        });
};

export const myprofile = user => {
    var headers = {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("usertoken")
    };
    return axios
        .get("/profile", { headers: headers })
        .then(res => {
            return res.data;
        })
        .catch(err => {

            console.log(err);

        });
}