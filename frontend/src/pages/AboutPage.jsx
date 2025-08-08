import React from "react";
import "./AboutPage.css";

const team = [
  {
    name: "D",
    img: "/f3.png",
    role: "Team Lead",
    info: "Computer science undergraduate. Coordinates our project and keeps us all on track."
  },
  {
    name: "T",
    img: "/f1.jpg",
    role: "Blockchain Developer",
    info: "Student passionate about smart contracts and decentralized apps; drives our crypto integration."
  },
  {
    name: "X",
    img: "/f2.jpg",
    role: "Fronted Developer",
    info: "Creative UI/UX enthusiast, making our platform beginner-friendly for all crypto learners."
  },
  {
    name: "Y",
    img: "/m1.jpg",
    role: "AI Developer",
    info: "Machine learning student fascinated by trading algorithms and real-world AI applications."
  },
  {
    name: "H",
    img: "/m2.jpg",
    role: "Blockchain Developer",
    info: "Focused on blockchain security and infrastructure. Ensures our project is robust and reliable."
  }
];

export default function AboutPage() {
  return (
    <div className="legal-static-bg">
      <div className="legal-static-container-1">
        <h1>About Us</h1>
        <p>
          Our mission is to help anyone—new or experienced—discover successful traders by providing high quality, unbiased, data-driven recommendations scraped from public leaderboards and verified sources.
          <br /><br />
          <b>We do not accept or process trades. Always manage your own risk independently.</b>
          <br /><br />
          Made with ❤️ by a small, passionate team of traders and engineers.
        </p>
        <h2 className="team-title">Our Team</h2>
        <div className="team-row">
          {team.map((person) => (
            <div className="team-card" key={person.name}>
              <img className="team-img" src={person.img} alt={person.name} />
              <div className="team-name">{person.name}</div>
              <div className="team-role">{person.role}</div>
              <div className="team-info">{person.info}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
