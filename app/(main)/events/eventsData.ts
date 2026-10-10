import type { ImageProps } from "next/image";

import placeholder1 from "@/public/events/gifting.png";
import placeholder2 from "@/public/events/happy.png";
import placeholder3 from "@/public/events/jaydon.png";
import placeholder4 from "@/public/events/robes.jpg";

export interface EventItem {
    id: number;
    title: string;
    dateTime: string;
    venue: string;
    fellowships: string[];
    description: string;
    images: ImageProps["src"][];
}

export const carouselImages: ImageProps["src"][] = [
    placeholder1,
    placeholder2,
    placeholder3,
    placeholder4,
];


export const fellowshipsList = [
    { name: "Adult", bgColour: "#A41216", txtColor: "#FFFFFF" },
    { name: "Young Adult", bgColour: "#37393A", txtColor: "#FFFFFF" },
    { name: "Youth", bgColour: "#254188", txtColor: "#FFFFFF" },
    { name: "Kidz", bgColour: "#A46512", txtColor: "#FFFFFF" },
    { name: "Kidz Jr", bgColour: "#7D12A4", txtColor: "#FFFFFF" },
    { name: "All", bgColour: "#999999", txtColor: "#000000" },
];

export const fellowshipMap: Record<string, string> = {
    Adult: "adult",
    "Young Adult": "ya",
    Youth: "y",
    Kidz: "kidz",
    "Kidz Jr": "kjr",
    All: "",
};
