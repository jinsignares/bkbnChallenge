import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    navbar: {
        display: "flex",
        justifyContent: "space-between"
    }, 
    title: {
        flexGrow: 1
    }
}));

export default useStyles