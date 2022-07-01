import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// {props.meetups} comes from "getStaticProps"
const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

/*
// Runs on the server after deployment (ALso runs after every request) (has access to req, res)
export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  // Fetch Data from API

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};
*/

// Function Runs during the build process => needs return  { props: { anyName: Data } }
export const getStaticProps = async () => {
  // fetch data from API
  const password = process.env.DB_PASSWORD;

  // Connecting to MongoDB DataBase
  const client = await MongoClient.connect(
    `mongodb+srv://kaheno1312:${password}@cluster0.7uoo5.mongodb.net/meetups?retryWrites=true&w=majority`
  );

  // Getting Database "meetups" collection
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // Get all Data into [Array]
  const meetups = await meetupsCollection.find().toArray();

  // Close Connection to MongoDB
  client.close();

  return {
    // {props.meetups} in JSX
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, // To Revalidate/Replace "meetups" data if there's any changes every 1 secs
  };
};

export default HomePage;
