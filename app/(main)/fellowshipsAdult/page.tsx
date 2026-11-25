// adult fellowships page

import FellowshipsPage from '@/components/fellowshipPage/fellowshipsPage'

function FellowshipsAdult() {
    return <FellowshipsPage name="Adult Cell Groups" color="#942636" tag="adult" showCellGroups={true} 
    info={["Cell Group", "subtexttttt", "this is what we do asdfjalsdfjalskfjdalsdfjalskdfjalskdfjaslkdfjasldfkjaslkdfjalsdfkjaskdfjalskdjflaskfj", "ATTENTION PLEASE: This is an important announcement!", "more information alkdjflajoqwieruqoieuwoqruqwoireuqowirqowiruoqwiurqwiouroqwiruoqwiruqwoiruqwoiruoqwier"]}
    cellgroups={["Deacon David", "Deacon Geok Hwee", "David Ang", "Sisters Fellowship"]}
    cgTexts={["Deacon David cell group does xyzaklsdfjlasjfaskdjalskjfasdflaksdjlkfjaslkdfjas", "Deacon Geok Hwee cell group does aldjflaksdjfalskfjlsakdfjalskdfjla", "David Ang cell group does...", "Sisters Fellowship comprises of women of all ages, they have done kjadflskjfalskjlsjflasjoierqoiroqwreoqwirqoireqwori"]}
    />
}

export default FellowshipsAdult

// info: "Cell Group", "subtext of what we do","content of what we do", "content of attention bar", "content of more information"

// upcomingInfo: "Sunday School", "studying book of?", "title of lesson", "venue", "datetime"

// TO CHANGE
// put cell groups as a component with an interface and put it in