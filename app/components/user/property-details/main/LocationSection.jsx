export default function LocationSection() {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="font-bold text-[1.37rem]">¿Donde Estaras?</h2>
            <map className="w-full rounded-lg h-[20vh]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194347.47827013538!2d-3.844343464188269!3d40.438098610297125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2zTWFkcmlkLCBFc3Bhw7Fh!5e0!3m2!1ses-419!2sar!4v1721089011154!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: 10 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </map>
        </section>
    );
}
