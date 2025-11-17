"use client";

export default function UserInfo({ firstName }) {
    return (
        <section className="user-info">
            <h1>
                Bonjour <span>{firstName}</span>
            </h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </section>
    );
}
