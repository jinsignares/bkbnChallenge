import axios from "axios";

export const get = async (url, opts = { headers: {} }) => {
    try {
        return await axios.get(url, {
            headers: { ...opts.headers },
        });
    } catch (error) {
        console.error(error)
    }
};

export const post = async (url, opts) => {
    try {
        return await axios.post(url, {
            ...opts,
        });
    } catch (error) {
        console.error(error)
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