// Temporary history data
const historyTitles = [
  "Looking Toward the Future",
  "A New Season of Fellowship",
  "Community Connections",
  "Growing Together in Faith",
  "A Churchwide Celebration",
  "Youth Fellowship Milestone",
  "Expanding Community Outreach",
  "A Season of Renewal",
  "New Fellowship Initiatives",
  "Serving Our Neighbours",
  "Worship and Music Celebration",
  "Building Stronger Relationships",
  "A New Ministry Initiative",
  "Intergenerational Fellowship",
  "Community Service Weekend",
  "Welcoming New Families",
  "Strengthening Small Groups",
  "A Year of Shared Service",
  "Church Family Gathering",
  "Developing New Leaders",
  "Expanding Youth Activities",
  "A New Chapter in Ministry",
  "Celebrating Volunteers",
  "Fellowship Across Generations",
  "Community Outreach Day",
  "Growing in Discipleship",
  "A Season of Thanksgiving",
  "New Opportunities to Serve",
  "Building Community Partnerships",
  "A Churchwide Retreat",
  "Renewing Ministry Goals",
  "Strengthening Pastoral Care",
  "A Celebration of Fellowship",
  "Supporting Families",
  "Developing Worship Ministries",
  "A Year of Community Service",
  "Welcoming Returning Members",
  "Expanding Fellowship Activities",
  "A New Outreach Programme",
  "Encouraging Young Leaders",
  "Celebrating Church Milestones",
  "Growing Through Fellowship",
  "Serving the Local Community",
  "A Season of Prayer",
  "Strengthening Church Connections",
  "New Ministry Opportunities",
  "A Community Thanksgiving",
  "Developing Discipleship Groups",
  "A Year of Shared Memories",
  "Fellowship and Friendship",
  "Supporting the Next Generation",
  "A Church Family Celebration",
  "Expanding Volunteer Activities",
  "Building Lasting Relationships",
  "A New Season of Worship",
  "Encouraging Community Participation",
  "Growing Together as a Church",
  "Celebrating Ministry Teams",
  "A Year of Faith and Service",
  "Connecting With Neighbours",
  "Strengthening Fellowship Groups",
  "Developing Community Outreach",
  "A New Chapter of Service",
  "Churchwide Fellowship Day",
  "Encouraging Spiritual Growth",
  "Celebrating Shared Traditions",
  "Supporting Youth Fellowship",
  "A Season of Community Building",
  "Growing the Ministry Team",
  "Welcoming New Participants",
  "A Year of Fellowship",
  "Developing New Traditions",
  "Strengthening Community Ties",
  "A Churchwide Gathering",
  "Serving Together in Unity",
  "A Season of Reflection",
  "Expanding Church Activities",
  "Encouraging Faith Formation",
  "Celebrating Church Community",
  "A New Ministry Season",
  "Growing Through Service",
  "Building a Welcoming Community",
  "A Year of New Beginnings",
  "Strengthening Church Fellowship",
  "Community and Worship",
  "Developing Future Leaders",
  "Celebrating Shared Faith",
  "A Season of Togetherness",
  "Growing Through Outreach",
  "Building on Past Foundations",
  "A Church Family Milestone",
  "Expanding Fellowship Opportunities",
  "Serving With Compassion",
  "A Year of Renewal",
  "Strengthening the Church Family",
  "Remembering Earlier Generations",
  "The Early Church Community",
  "Singapore Baptist Church Established"
];


const tempHistoryData = historyTitles.map((title, index) => {
  const monthOffset = Math.round(index * 1071 / 99);
  const eventDate = new Date(2026, 8 - monthOffset, 1);

  const date = eventDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric"
  });

  return {
    title,
    date,
    images: [
      `/events/gifting.png`,
      `/events/happy.png`,
      `/events/jaydon.png`
    ],
    description:
      `Temporary timeline entry ${index + 1}. ` +
      "Replace this placeholder with the verified history, " +
      "context, and significance of the event."
  };
});


export { historyTitles, tempHistoryData };