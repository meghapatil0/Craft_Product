import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { addProduct, getProduct } from "../../store/actions";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  rootInput: {
    "& > *": {
      margin: "4px",
      width: "25ch",
    },
  },
  root: {
    minWidth: 275,
    marginLeft: "10%",
    display: "flex",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    marginTop: "10%",
    color: "white",
    background: "#3ebdfd",
  },
});

export const Contents = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    timeFrame: "",
    projectType: "",
    name: "",
    budget: "",
    company: "",
    aboutProject: "",
    email: "",
  });
  const [products, setProduct] = React.useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      await dispatch(getProduct());
    };
    let data = loadProducts();
    console.log(data);
  }, [dispatch]);

  const [state, setState] = React.useState({
    Desktop: false,
    Web: false,
    Mobile: false,
    Others: false,
  });

  const handleChangeCheck = (event) => {
    debugger;
    setState({ ...state, [event.target.name]: event.target.checked });
    setPayload({
      ...payload,
      projectType: { ...state, [event.target.name]: event.target.checked },
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log("handleSubmit", payload);
    dispatch(addProduct(payload));
  };

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        <Card className={classes.root}>
          <CardContent>
            <Box>
              <FormControl component="fieldset">
                <FormLabel component="legend">Time Frame</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="timeFrame"
                  value={payload.timeFrame}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="1 month"
                    control={<Radio />}
                    label="1 month"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="2-3 months"
                    control={<Radio />}
                    label="2-3 months"
                    onChange={handleChange}
                  />
                  <FormControlLabel
                    value="4+ months"
                    control={<Radio />}
                    label="4+ months"
                    onChange={handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box marginTop="10%">
              <FormControl
                component="fieldset"
                className={classes.formControl}
                name="projectType"
              >
                <FormLabel component="legend">Project Type</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Desktop}
                        onChange={handleChangeCheck}
                        name="Desktop"
                      />
                    }
                    label="Desktop"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Web}
                        onChange={handleChangeCheck}
                        name="Web"
                      />
                    }
                    label="Web"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Mobile}
                        onChange={handleChangeCheck}
                        name="Mobile"
                      />
                    }
                    label="Mobile"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.Others}
                        onChange={handleChangeCheck}
                        name="Others"
                      />
                    }
                    label="Others"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Personal Details
            </Typography>
            <form className={classes.rootInput} autoComplete="off">
              <Box>
                <TextField
                  id="outlined-name"
                  label="Name"
                  variant="outlined"
                  width="200px"
                  name="name"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-company"
                  label="Company"
                  variant="outlined"
                  width="200px"
                  name="company"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-email"
                  label="Email"
                  variant="outlined"
                  width="200px"
                  name="email"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-budget"
                  label="Budget"
                  variant="outlined"
                  width="200px"
                  name="budget"
                  onChange={handleChange}
                />
              </Box>
            </form>
          </CardContent>
        </Card>

        <Box>
          <Card className={classes.root}>
            <CardContent>
              <TextField
                id="outlined-multiline-static"
                label="About Project"
                name={"aboutProject"}
                multiline
                rows={12}
                variant="outlined"
                placeholder="Tell us about your project"
                onChange={handleChange}
              />
            </CardContent>
          </Card>
          <Button className={classes.button} onClick={handleSubmit}>
            {" "}
            Send Inquiry{" "}
          </Button>
        </Box>
      </Box>

      <h1>List of crafted product</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Budget</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">About Project</TableCell>
              <TableCell align="right">Time Frame</TableCell>
              <TableCell align="right">projectType</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((row) => {
                var keys = Object.keys(row.projectType);
                debugger;
                var filtered = keys.filter(function (key) {
                  return filtered[key];
                });
                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{payload.name}</TableCell>
                    <TableCell align="right">{payload.email}</TableCell>
                    <TableCell align="right">{payload.budget}</TableCell>
                    <TableCell align="right">{payload.company}</TableCell>
                    <TableCell align="right">{payload.aboutProject}</TableCell>
                    <TableCell align="right">{payload.timeFrame}</TableCell>
                    <TableCell align="right">{filtered}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Contents;
