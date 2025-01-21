const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./middlewares/corsMiddleware');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const nitUpdates = require('./model/nitUpdates');
// const atddata = require('./model/atdSesInfo');
// const nitresult = require('./model/nitresult');
const bodyParser = require('body-parser');
const Admin = require('./model/admin');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.use(cookieParser());

app.use(corsMiddleware);

app.get('/protected', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ success: false, error: 'Unauthorized', auth: false });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            const admin = await Admin.findOne({ email: verified.email })
            if (admin) {
                res.json({ success: true, admin: true, message: 'Protected content', auth: true, user: verified })
            } else {
                res.json({ success: false, error: 'Unauthorized', auth: false, admin: false });
            }
            // console.log(admin+"hi")
        } else {
            res.json({ success: false, error: 'Unauthorized', auth: false });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: 'Unauthorized', auth: false });
    }
});

const axios = require('axios');

app.get('/proxy-image', async (req, res) => {
    const imageUrl = req.query.url;  // URL to the image (passed as query parameter)
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }
    try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

        // Set appropriate headers for image type
        const contentType = response.headers['content-type'];
        res.set('Content-Type', contentType);

        // Send the image as a response
        res.send(response.data);
    } catch (error) {
        // console.error('Error fetching image:', error);
        res.status(500).send('Failed to load image');
    }
});

app.get('/getcontent', async (req, res) => {
    const y = req.query.y;
    const m = req.query.m;
    const d = req.query.d;
    try {
        let response = {};
        if (d) {
            response = await axios.get("https://nit-python-web.vercel.app/content?y=" + y + "&m=" + m + "&d=" + d);

        } else {
            response = await axios.get("https://nit-python-web.vercel.app/content?y=" + y + "&m=" + m);

        }
        res.json({ success: true, data: response.data });  // Use response.data to send the actual content
    } catch (error) {
        console.log(error);
        res.json({ success: false, error: 'Unauthorized', auth: false });
    }
});

app.post('/updateform', async (req, res) => {
    const {id, name, type, url, sem, date, set, work,work2,branch } = req.body;
    const token = req.cookies.token;
    if (!token) {
        return res.json({ success: false, error: 'Unauthorized', auth: false });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            const admin = await Admin.findOne({ email: verified.email })
            if (admin) {
                let setup = 2;
                if(admin.role === 3){
                    setup = 0;
                }
                if(admin.role === 2){
                    setup = 1;
                }
                const updateddata = await nitUpdates.findOneAndUpdate(
                    {_id: id }, // Query
                    { $set: { name: name,
                        type: type,
                        url: url,
                        sem: sem,
                        date: date,
                        set: set,
                        setup: setup,
                        work: work,
                        work2: work2,
                        branch: branch } },          // Update
                    { returnDocument: "after", new: true } // Options to return the updated document
                );
                if(updateddata){
                    res.json({ success: true, data: updateddata});
                }else{
                res.json({ success: false}); } // Use response.data to send the actual content
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }}catch (error) {
            console.log(error)
            res.json({ success: false });
        }

    });
app.post('/submitform', async (req, res) => {
        const { name, type, url, sem, date, set, work,work2,branch } = req.body;
        const token = req.cookies.token;
        if (!token) {
            return res.json({ success: false, error: 'Unauthorized', auth: false });
        }
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            if (verified) {
                const admin = await Admin.findOne({ email: verified.email })
                if (admin) {
                    let setup = 2;
                    if(admin.role === 3){
                        setup = 0;
                    }
                    if(admin.role === 2){
                        setup = 1;
                    }
                    const newUpdate = new nitUpdates({
                        name: name,
                        type: type,
                        url: url,
                        sem: sem,
                        date: date,
                        set: set,
                        setup: setup,
                        work: work,
                        work2: work2,
                        branch: branch
                    })
                    await newUpdate.save();
                    res.json({ success: true, data: newUpdate});  // Use response.data to send the actual content
                } else {
                    res.json({ success: false });
                }
            } else {
                res.json({ success: false });
            }}catch (error) {
                console.log(error)
                res.json({ success: false });
            }
    
});
app.post('/getsubmitedcontent', async (req, res) => {
    const { set } = req.body;
    const token = req.cookies.token;
    if (!token) {
        return res.json({ success: false, error: 'Unauthorized', auth: false });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            const admin = await Admin.findOne({ email: verified.email })
            if (admin) {
                const submittedData = await nitUpdates.find({ set: set })
                res.json({ success: true, subdata: submittedData });
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }  // Use response.data to send the actual content

});

// app.get('/getatdlist', async (req, res) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.find({ parent: verified.id });
//         res.json({ success: true, seslist: atdseslist, auth: true });
//     } catch (error) {
//         res.json({ success: false, error: 'Unauthorized', auth: false });

//     }
// });

// app.post('/getsesinfo', async (req, res) => {
//     const { id } = req.body;
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.findOne({ parent: verified.id, _id: id });
//         if (atdseslist) {
//             const atd_data = await atddata.findOne({ sessId: atdseslist._id });
//             return res.status(201).json({ success: true, auth: true, sesDet: atdseslist, sesData: atd_data });
//         } else {
//             res.status(201).json({ success: true, auth: true, sesDet: atdseslist });
//         }
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, error: 'Unauthorized', auth: true });

//     }
// });
// const generateSubjectCode = () => {
//     // Generate a random 6-digit integer code
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// app.post('/addsubject', async (req, res) => {
//     const { id, subject } = req.body;
//     const token = req.cookies.token;
//     if (!subject || !Array.isArray(subject)) {
//         return res.status(400).json({ success: false, error: "Invalid subjects data" });
//     }
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     const subjectsMap = new Map();
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.findOne({ parent: verified.id, _id: id });
//         if (atdseslist) {
//             const oldsesdata = await atddata.findOne({ sessId: atdseslist._id });
//             if (oldsesdata) return res.status(400).json({ success: false, error: 'Already filled subject', auth: true });
//             subject.forEach((subjec) => {
//                 let subjectCode;
//                 do {
//                     subjectCode = generateSubjectCode();
//                 } while (subjectsMap.has(subjectCode));
//                 subjectsMap.set(subjectCode, subjec);
//             });
//             const newatddata = new atddata({
//                 sessId: atdseslist._id,
//                 subjects: subjectsMap
//             });
//             await newatddata.save();
//             const updatedsesDet = await atdses.findOneAndUpdate(
//                 { parent: verified.id, _id: id }, // Query
//                 { $set: { setup: 1 } },          // Update
//                 { returnDocument: "after", new: true } // Options to return the updated document
//             );
//             if (updatedsesDet) {
//                 res.status(201).json({
//                     success: true,
//                     sesDet: updatedsesDet,
//                     sesData: newatddata, auth: true
//                 });
//             } else {
//                 res.status(404).json({ success: false, message: "Document not found" });
//             }
//         } else {
//             return res.json({ success: false, error: 'Unauthorized', auth: false });
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// app.post('/addschd', async (req, res) => {
//     const { id, schedule } = req.body;
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.findOne({ parent: verified.id, _id: id });
//         if (atdseslist) {
//             const oldsesdata = await atddata.findOne({ sessId: atdseslist._id });
//             if (oldsesdata) {
//                 const updateoldsesdata = await atddata.findOneAndUpdate(
//                     { sessId: atdseslist._id }, // Query
//                     { $set: { schedule: schedule } },
//                     { returnDocument: "after", new: true }
//                 );
//                 const updatedsesDet = await atdses.findOneAndUpdate(
//                     { parent: verified.id, _id: id }, // Query
//                     { $set: { setup: 2 } },          // Update
//                     { returnDocument: "after", new: true } // Options to return the updated document
//                 );
//                 if (updatedsesDet && updateoldsesdata) {
//                     res.status(201).json({
//                         success: true,
//                         sesDet: updatedsesDet,
//                         sesData: updateoldsesdata, auth: true
//                     });
//                 } else {
//                     res.status(404).json({ success: false, message: "Document not found" });
//                 }
//             } else {
//                 return res.json({ success: false, error: 'Unauthorized', auth: true });
//             }

//         } else {
//             return res.json({ success: false, error: 'Unauthorized', auth: true });
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// app.post('/fillatd', async (req, res) => {
//     const { id, attendance } = req.body;
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.findOne({ parent: verified.id, _id: id });
//         if (atdseslist) {
//             const oldsesdata = await atddata.findOne({ sessId: atdseslist._id });
//             if (oldsesdata) {
//                 let updatedAttendance = oldsesdata.attendance || new Map();
//                 // Process the new attendance data
//                 Object.keys(attendance).forEach((date) => {
//                     const subjects = attendance[date];
//                     if (!updatedAttendance.has(date)) {
//                         // If the date doesn't exist, add it as an object (not a Map)
//                         updatedAttendance.set(date, { ...subjects });
//                     } else {
//                         // If the date exists, update the subjects for the date
//                         const existingSubjects = updatedAttendance.get(date);
//                         // Iterate over the subjects to update the status
//                         Object.keys(subjects).forEach((subjectCode) => {
//                             const newStatus = subjects[subjectCode];
//                             if (newStatus === 'Present') {
//                                 // Remove the subject if it's marked as 'Present' (i.e., delete the entry)
//                                 existingSubjects.delete(subjectCode);


//                                 // If no subjects remain, delete the date entirely from the Map
//                                 if (existingSubjects.size === 0) {
//                                     updatedAttendance.delete(date);
//                                 }
//                             } else {
//                                 existingSubjects.set(subjectCode, newStatus);
//                             }
//                         });
//                         updatedAttendance.set(date, existingSubjects);
//                     }
//                 });

//                 // Save the updated attendance to the document
//                 const updateoldsesdata = await atddata.findOneAndUpdate(
//                     { sessId: atdseslist._id },
//                     { $set: { attendance: updatedAttendance } },
//                     { returnDocument: "after", new: true }
//                 );
//                 res.status(201).json({
//                     success: true,
//                     data: updateoldsesdata
//                 });
//             } else {
//                 return res.json({ success: false, error: 'Unauthorized', auth: true });
//             }
//         } else {
//             return res.json({ success: false, error: 'Unauthorized', auth: true });
//         }
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// app.post('/changesesdate', async (req, res) => {
//     const { id, date } = req.body;
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const atdseslist = await atdses.findOne({ parent: verified.id, _id: id });
//         if (atdseslist) {
//             const updatedsesDate = await atdses.findOneAndUpdate(
//                 { parent: verified.id, _id: id }, // Query
//                 { $set: { sesStart: date } },          // Update
//                 { returnDocument: "after", new: true } // Options to return the updated document
//             );
//             if (updatedsesDate) {
//                 res.status(201).json({
//                     success: true
//                 });
//             } else {
//                 res.status(404).json({ success: false, message: "Document not found" });
//             }
//         } else {
//             res.status(404).json({ success: false, message: "Document not found" });
//         }
//     } catch (error) {
//         console.error('Error during change Date:', error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// })


// app.post('/addses', async (req, res) => {
//     const { sestitle, selectedDate } = req.body;
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ success: false, error: 'Unauthorized', auth: false });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         const newatdses = new atdses({
//             title: sestitle,
//             sesStart: selectedDate,
//             parent: verified.id
//         });
//         await newatdses.save();
//         // Respond after successful email and user creation
//         res.status(201).json({ success: true, atdSes: newatdses });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(400).json({ success: false, error: error.message });
//     }
// });

// app.post('/result/items', async (req, res) => {
//     const { page, limit, filters = null } = req.body;
//     try {
//         const items = await nitresult.find(filters).sort({ attachment: -1 })
//             .skip((page - 1) * limit)  // Skip previous items
//             .limit(parseInt(limit))  // Limit the number of items per page

//         const processedItems = []
//         Object.keys(items).forEach(key => {
//             const newEntry = {}
//             newEntry["roll_numbers"] = items[key].roll_numbers;
//             newEntry["branch"] = items[key].branch
//             newEntry["name"] = items[key].name
//             newEntry["sem"] = items[key].sem
//             if (items[key].date) {
//                 newEntry["date"] = items[key].date
//             }
//             newEntry["url"] = process.env.REACT_APP_API_URL + "/result/pdf?attachment=" + items[key]._id
//             processedItems[key] = newEntry
//         });
//         res.json(processedItems);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// app.get("/result/pdf", async (req, res) => {
//     const pdfUrl = req.query.attachment;  // URL to the image (passed as query parameter)
//     if (!pdfUrl) {
//         return res.status(400).send('PDF URL is required');
//     }
//     try {
//         const attachment = await nitresult.findOne({_id: pdfUrl});
//         const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
//         const contentType = response.headers['content-type'];
//         res.set('Content-Type', contentType);
//         res.send(response.data);
//     } catch (error) {
//         console.error('Error fetching image:', error);
//         res.status(500).send('Failed to load image');
//     }
// })


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}/`);
});
