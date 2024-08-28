import Message from "./Message";

export default function MessageContainer() {
  return (
    <section className="flex flex-col gap-2 w-full h-[78vh] my-4 overflow-auto grow">
      <p className="font-normal text-xs text-[#919191] self-center ">
        Lunes 1 de julio 2024 a las 09:12
      </p>
      <Message type={"sender"} body={"Hola"} time={"09:13"} />
      <Message
        type={"receiver"}
        body={
          "Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        }
        time={"09:14"}
      />
      <Message type={"sender"} body={"¿Cómo estás?"} time={"09:15"} />
      <Message type={"receiver"} body={"Bien, ¿y tú?"} time={"09:16"} />
      <Message
        type={"sender"}
        body={"También bien. ¿Qué tal tu fin de semana?"}
        time={"09:17"}
      />
      <Message
        type={"receiver"}
        body={"Fue muy bueno, fui a la playa y descansé. ¿Y el tuyo?"}
        time={"09:18"}
      />
      <Message
        type={"sender"}
        body={"Tranquilo, estuve en casa viendo películas."}
        time={"09:19"}
      />
      <Message
        type={"receiver"}
        body={"Eso suena genial. ¿Qué películas viste?"}
        time={"09:20"}
      />
      <Message
        type={"sender"}
        body={
          "Vi algunas comedias y una de ciencia ficción. ¿Has visto alguna buena últimamente?"
        }
        time={"09:21"}
      />
      <Message
        type={"receiver"}
        body={"Sí, vi una serie nueva que me encantó. ¡Te la recomiendo!"}
        time={"09:22"}
      />
    </section>
  );
}
