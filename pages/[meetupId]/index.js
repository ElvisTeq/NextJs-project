import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

// _________________________________________________________________________________________
// Pre-Generating Dynamic Params

// Pre-Defining Dynamic Params
export const getStaticPaths = async () => {
  const password = process.env.DB_PASSWORD;

  // Connecting to MongoDB DataBase
  const client = await MongoClient.connect(
    `mongodb+srv://kaheno1312:${password}@cluster0.7uoo5.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  // Getting Database "meetups" collection
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // Getting all "_id" into a [array]
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // Find all {objects}, Only get the { _id } field from the objects

  // Close MongoDB connection
  client.close();

  // Setting [Params] => [_id]
  return {
    fallback: false, // false (only existing "meetupId" will work)
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

// Get Data Before Loading Page
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId; // Getting Params from [meetupId] (requires "getStaticPaths()" to set up)

  const password = process.env.DB_PASSWORD;

  // Connecting to MongoDB DataBase
  const client = await MongoClient.connect(
    `mongodb+srv://kaheno1312:${password}@cluster0.7uoo5.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  // Getting Database "meetups" collection
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // Find meetup by "_id" which is in [_id] the Router
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  // ObjectId => To convert into OBJECT-ID (Format inside the MongoDB Database "_id")
  // => else it will not ".find" the "_id" because of different format

  // Close MongoDB connection
  client.close();

  return {
    // {props.meetupData.DATA} in JSX
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

// _________________________________________________________________________________________

export default MeetupDetails;
