import React from "react";
import {
  HeroSection,
  ReleasesSection,
  BrowseSection,
  LicensingSection,
  SoundSection,
  GetInTouch,
  ServiceSection,
} from "./components/sections/index";
import { FiPlay } from "react-icons/fi";

const HomeView = () => {
  const songs = [
    {
      title: "Lost in Paradise",
      artist: "Ali Gatie",
      image: "https://placehold.co/176x176?text=Song+1",
    },
    {
      title: "Ocean Eyes",
      artist: "Billie Eilish",
      image: "https://placehold.co/176x176?text=Song+2",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      image: "https://placehold.co/176x176?text=Song+3",
    },
    {
      title: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      image: "https://placehold.co/176x176?text=Song+4",
    },
    {
      title: "Sunflower",
      artist: "Post Malone, Swae Lee",
      image: "https://placehold.co/176x176?text=Song+5",
    },
  ];
  const recommended = [
    {
      title: "Peaches",
      artist: "Justin Bieber",
      image: "https://placehold.co/176x176?text=Rec+1",
    },
    {
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      image: "https://placehold.co/176x176?text=Rec+2",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      image: "https://placehold.co/176x176?text=Rec+3",
    },
    {
      title: "Heat Waves",
      artist: "Glass Animals",
      image: "https://placehold.co/176x176?text=Rec+4",
    },
    {
      title: "Industry Baby",
      artist: "Lil Nas X, Jack Harlow",
      image: "https://placehold.co/176x176?text=Rec+5",
    },
  ];
  return (
    <div className="">
      <HeroSection />
      <ReleasesSection />
      <BrowseSection />
      <LicensingSection />
      <SoundSection />
      <GetInTouch />
      <ServiceSection />
    </div>
  );
};

export default HomeView;
