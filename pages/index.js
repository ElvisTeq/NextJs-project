import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

// {props.meetups} comes from "getStaticProps"
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a list of active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
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
