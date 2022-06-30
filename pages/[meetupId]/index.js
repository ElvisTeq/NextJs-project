import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg"
      title="First Meetup"
      address="Some Street 5, Some city"
      description="The first meetup"
    />
  );
};

// _________________________________________________________________________________________
// Pre-Generating Dynamic Params

// Pre-Defining Dynamic Params
export const getStaticPaths = async () => {
  return {
    fallback: false, // false (only defined "meetupId" will work)
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

// Get Data Before Loading Page
export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId; // Getting Params from [meetupId] (requires "getStaticPaths()")

  console.log(meetupId);

  return {
    props: {
      meeptuData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
        id: meetupId,
        title: "First meetup",
        address: "Some Street 5, Some city",
        description: "The first meetup",
      },
    },
  };
};

// _________________________________________________________________________________________

export default MeetupDetails;
