import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5, 12345 a City",
    description: "The first meetup",
  },
  {
    id: "m2",
    title: "Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10, 23456 a City",
    description: "The second meetup",
  },
];

// <MeetupList> component expets "meetups" data as props
const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// Runs Before Page-Load => needs return  { props: { anyName: Data } }
export const getStaticProps = async () => {
  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default HomePage;
