const express = require("express");
const { usersModel, patientIdModel,reportsModel,careIDsModel } = require("../schemas/allSchemas");
const allroutes = express.Router();
const multer = require("multer");
const upload = multer();

const generateUniqueUserId = async () => {
  let unique = false;
  let userId;

  while (!unique) {
    userId = Math.floor(1000 + Math.random() * 9000).toString();
    let existingUser = await patientIdModel.findOne({ userId });
    if (!existingUser) {
      unique = true;
    }
  }

  return userId;
};

allroutes.get('/', (req, res) => {
  console.log("Reached root");
  res.send("Backend home");
});

allroutes.get('/userIds', async (req, res) => {
  try {
    const userIds = await patientIdModel.find({}, 'userId  name');
    res.json(userIds);
  } catch (error) {
    console.error('Error fetching userIds:', error);
    res.status(500).send('Internal Server Error: Failed to fetch userIds');
  }
});

allroutes.get('/reports/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching reports for userId:', userId);

  try {
    const reports = await reportsModel.find({ userId });
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).send('Internal Server Error: Failed to fetch reports');
  }
}
);

allroutes.get('/reports/:userId/:week', async (req, res) => {
  const { userId, week } = req.params;
  console.log('Fetching reports for userId:', userId, 'week:', week);
  try {
    const report = await reportsModel.find({ userId, week });
    res.json(report);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).send('Internal Server Error: Failed to fetch reports');
  }
}
);

allroutes.get('/allreports', async (req, res) => {
  try {
    const reports = await reportsModel.find({});
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).send('Internal Server Error: Failed to fetch reports');
  }
}
);

allroutes.post('/addpatient', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    const userId = await generateUniqueUserId();

    // Ensure all required fields are present in the request
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
      return res.status(400).send('Missing required fields: name, age, gender');
    }

    // Fetch all caretakers
    const caretakers = await careIDsModel.find({});

    if (caretakers.length === 0) {
      throw new Error('No caretakers available');
    }

    // Find the caretaker with the fewest patients
    let minLength = Infinity;
    let assignedCaretaker = null;

    caretakers.forEach(caretaker => {
      if (caretaker.patientIds.length < minLength) {
        minLength = caretaker.patientIds.length;
        assignedCaretaker = caretaker;
      }
    });

    if (!assignedCaretaker) {
      throw new Error('Unable to find a caretaker with minimum patients');
    }

    // Create a new patient
    let newPatient = new patientIdModel({
      userId,
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      caretakerId: assignedCaretaker.userId
    });

    let patientFromDB = await newPatient.save();

    // Update the caretaker's patientIds array
    assignedCaretaker.patientIds.push(userId);
    await assignedCaretaker.save();

    console.log(patientFromDB);
    res.send(patientFromDB);
  } catch (err) {
    console.log("Error while adding patient. Check if it is duplicate.");
    console.log(err);
    res.status(500).send(err);
  }
});


allroutes.post('/signup', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    const userId = await generateUniqueUserId();

    let newUser = new usersModel({
      userId,
      username: req.body.username,
      password: req.body.password,
      userType: "Care Taker"
    });

    let userFromDB = await newUser.save();

    let newCareTaker = new careIDsModel({
      userId,
      patientIds: []
    });

    let careTakerFromDB = await newCareTaker.save();

    console.log(userFromDB);
    console.log(careTakerFromDB);

    res.send(userFromDB);
  } catch (err) {
    console.log("Error while adding user. Check if it is duplicate.");
    console.log(err);
    res.status(500).send(err);
  }
});

allroutes.post('/login', upload.none(), async (req, res) => {
  try {
    console.log(req.body);
    let user = await usersModel.findOne({ userId: req.body.userId });

    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    if (user.password !== req.body.password) {
      return res.status(400).send('Incorrect password');
    }

    res.send({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


allroutes.post("/save", async (req, res) => {
  const { userId, week, ...reportData } = req.body;
  const  Prediction = "";
  const DocNote = "";
  const dietPlan = "";
  console.log('Received data to save:', req.body);

  if (!userId || !week || !reportData) {
    return res.status(400).send("User ID, week number, and report data are required");
  }

  try {
    const report = new reportsModel({ userId, week, reportData ,Prediction,DocNote,dietPlan});
    await report.save();
    res.send({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Internal Server Error: Failed to save data');
  }
});


module.exports = allroutes;
