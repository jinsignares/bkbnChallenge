import axios from "axios";

export const get = async (url, opts = { headers: {} }) => {
    return await axios.get(url, {
        headers: { ...opts.headers },
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        console.log(error.config);
    })
};

export const post = async (url, opts) => {
    try {
        return await axios.post(url, {
            ...opts,
        });
    } catch (error) {
        return error
    }
};

export const update = async (url, opts) => {
    try {
        return await axios.put(url, {
            ...opts
        });
    } catch (error) {
        console.error(error)
    }
};

export const remove = async (url) => {
    try {
        return await axios.delete(url);
    } catch (error) {
        console.error(error)
    }
};