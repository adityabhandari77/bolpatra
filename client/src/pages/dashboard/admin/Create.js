import React, { useState, useRef, setRef, createRef } from "react";
import { API } from "aws-amplify";
import { s3Upload } from "../../../libs/awsLib";

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

const Create = ({ status }) => {
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

  if (status) {
    console.log(status);
  }

  async function handleSubmit(event) {
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
      {vari.uploadSuccess ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={vari.alert}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Notice saved successfully!
          </Alert>
        </Snackbar>
      ) : vari.error ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={vari.alert}
          autoHideDuration={10000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Error saving notice!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
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
        <form onSubmit={handleSubmit}>
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
                  value={data.newspaper}
                  onChange={(event, newValue) => {
                    setData({ ...data, newspaper: newValue });
                  }}
                  options={newspaper}
                  onInputChange={(event, newValue) => {
                    setData({ ...data, newspaper: newValue });
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Newspaper"
                      value={data.newspaper}
                      variant="outlined"
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
                required
              >
                <Autocomplete
                  id="category"
                  value={data.category}
                  onChange={(event, newValue) => {
                    setData({ ...data, category: newValue });
                  }}
                  options={category}
                  onInputChange={(event, newValue) => {
                    setData({ ...data, category: newValue });
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      value={data.category}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="industry"
                  value={data.industry}
                  onChange={(event, newValue) => {
                    setData({ ...data, industry: newValue });
                  }}
                  options={industry}
                  onInputChange={(event, newValue) => {
                    setData({ ...data, industry: newValue });
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Industry"
                      variant="outlined"
                      value={data.industry}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="product_services"
                  value={data.product_services}
                  onChange={(event, newValue) => {
                    setData({ ...data, product_services: newValue });
                  }}
                  options={product_services}
                  onInputChange={(event, newValue) => {
                    setData({ ...data, product_services: newValue });
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Product / Services"
                      variant="outlined"
                      value={data.product_services}
                      required
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="province"
                  onChange={(event, newValue) => {
                    console.log(newValue);

                    setData({ ...data, province: newValue });
                  }}
                  disabled={data.district ? true : false}
                  options={province}
                  value={data.province}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Province"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Autocomplete
                  id="district"
                  key={data.province ? null : data.district}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setData({
                        ...data,
                        district: newValue.district,
                        province: newValue.province,
                      });
                    } else {
                      setData({
                        ...data,
                        district: null,
                        province: null,
                      });
                    }
                  }}
                  options={
                    data.province
                      ? districts.filter((province) =>
                          province.province.includes(data.province)
                        )
                      : districts
                  }
                  getOptionLabel={(option) => option.district}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="District"
                      variant="outlined"
                      value={data.district}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  name="notice_provider"
                  id="notice_provider"
                  value={data.notice_provider}
                  label="Notice Provider"
                  variant="outlined"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  name="description"
                  id="description"
                  value={data.description}
                  label="Description"
                  variant="outlined"
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Published Date"
                    value={data.published_date}
                    format="MM/DD/YYYY"
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDate(date)}
                    required
                    disableFuture
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <Slider
                  defaultValue={0}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={100}
                  onChange={(event, value) => updateSubmissionDate(value)}
                  marks={[
                    {
                      value: 0,
                      label: "0",
                    },
                    {
                      value: 30,
                      label: "30 Days",
                    },
                    {
                      value: 100,
                      label: "100 Days",
                    },
                  ]}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  inputVariant="outlined"
                  label="Submission Date"
                  value={data.submission_date}
                  format="MM/DD/YYYY"
                  InputAdornmentProps={{ position: "start" }}
                  onChange={(date) =>
                    setData({
                      ...data,
                      submission_date: date,
                    })
                  }
                  required
                  style={{ width: 240, marginRight: 20 }}
                />
                <TextField
                  id="time"
                  variant="outlined"
                  label="Submission Time"
                  type="time"
                  defaultValue="12:00"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleTimeChange}
                  inputProps={{
                    step: 900, // 15 min
                  }}
                  style={{ width: 140 }}
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                style={{ marginTop: 20 }}
              >
                <TextField
                  name="remarks"
                  value={data.remarks}
                  id="remarks"
                  label="Remarks"
                  variant="outlined"
                  onChange={handleChange}
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
                  name="external_link"
                  id="external_link"
                  value={data.external_link}
                  label="External Link"
                  type="url"
                  variant="outlined"
                  onChange={handleChange}
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
