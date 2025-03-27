const songPath = '/annoying_jingle.mp3'

export default function SongPlayer() {
    return (
    <audio autoPlay loop>
        <source src={songPath} type="audio/mp3"/>
        Your browser does not support the audio element.
    </audio>
    );
}