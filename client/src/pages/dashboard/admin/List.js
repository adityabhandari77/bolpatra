import React, { useState, useRef, setRef, createRef } from "react";
import { API } from "aws-amplify";
import { s3Upload } from "../../../libs/awsLib";
import { useForm } from "react-hook-form";

import {
  Grid,
  Paper,
  FormControl,
  makeStyles,
  Button,
  TextField,
  Typography,
  Slider,
  Snackbar,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import SaveIcon from "@material-ui/icons/Save";

import opt from "./create.json";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
    marginBottom: 10,
  },
  select: {
    minWidth: "10rem",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const newspaper = opt.newspaper;
const category = opt.category;
const industry = opt.industry;
const product_services = opt.product_services;
const province = opt.province;
const districts = opt.districts;

const defaultValues = {
  TextField: null,
};

const Create = (props) => {
  const { register, handleSubmit, watch, errors, reset, setValue } = useForm();
  const onSubmit = (datay) => {
    console.log(props);
    reset(defaultValues);
    props.history.push("/admin/all-notices?status=true");
    window.location.reload();
  };

  const initialstate = {
    isPublished: false,
    isMailed: false,
    newspaper: null,
    category: null,
    industry: null,
    product_services: null,
    province: null,
    district: null,
    notice_provider: "",
    description: "",
    published_date: new Date(),
    submission_date: new Date(new Date().setHours("12", "0", "0")),
    remarks: undefined,
    external_link: undefined,
  };
  const classes = useStyles();
  const [data, setData] = useState(initialstate);

  const file = useRef(null);

  const [vari, setVari] = useState({
    uploadSuccess: false,
    error: false,
    alert: false,
  });

  async function handleSubmits(event) {
    event.preventDefault();

    console.log("starting saving file");
    const attachment = file.current ? await s3Upload(file.current) : null;
    console.log(attachment);
    console.log("file saved successfully");

    if (attachment) {
      try {
        console.log("starting saving notice");
        await API.post("notices", `/create-notice/${attachment}`, {
          body: data,
        }).then();
        setVari({
          ...vari,
          alert: true,
          uploadSuccess: true,
        });
        console.log("notice created successfully");
        setData(initialstate);
        file.current.value = "";
      } catch (error) {
        setVari({
          ...vari,
          alert: true,
          error: true,
        });
      }
    }
  }

  const handleDate = (e) => {
    setData({
      ...data,
      published_date: e,
    });
  };

  const handleTimeChange = (e) => {
    const hours = new Date(data.submission_date);
    console.log(e.target.value);
    const arr = e.target.value;
    const hm = arr.split(":");
    console.log(hm);
    hours.setHours(hm[0], hm[1], "0");
    console.log(hours);
    const fff = new Date(hours);
    console.log(fff);
    setData({
      ...data,
      submission_date: fff,
    });
  };

  const updateSubmissionDate = (days) => {
    const new_date = new Date(data.published_date);
    new_date.setDate(new_date.getDate() + days);
    new_date.setHours("12", "0", "0");
    setData({
      ...data,
      submission_date: new_date,
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "notice_image") {
      console.log(e.target.files[0]);
      file.current = e.target.files[0];
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setVari({
      ...vari,
      alert: false,
      uploadSuccess: false,
      error: false,
    });
  };

  return (
    <React.Fragment>
      <Paper
        style={{
          margin: "5rem 25rem 5rem 10rem",
          padding: "1rem",
          minWidth: 480,
        }}
        variant="elevation"
        elevation={10}
      >
        <Typography
          variant="h4"
          style={{ marginBottom: 20, marginLeft: 10, padding: 5 }}
        >
          Create Notice
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="column"
            justify="center"
            style={{ alignItems: "center", minWidth: 480 }}
          >
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="newspaper"
                  onChange={(event, newValue) => {
                    setValue([{ newspaper: newValue }]);
                  }}
                  key={register.newspaper}
                  options={newspaper}
                  onInputChange={(event, newValue) => {
                    setValue([{ newspaper: newValue }]);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Newspaper"
                      variant="outlined"
                      name="newspaper"
                      inputRef={register}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                style={{ marginTop: 20 }}
              >
                <TextField
                  name="notice_image"
                  inputRef={register}
                  type="file"
                  id="notice_image"
                  label="Select File"
                  variant="outlined"
                  ref={file}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
          <br />
          <Grid container>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<SaveIcon />}
              style={{ margin: "auto" }}
            >
              Save
            </Button>
          </Grid>
        </form>
        <em>{JSON.stringify(data, 0, 2)}</em>
      </Paper>
    </React.Fragment>
  );
};

export default Create;
