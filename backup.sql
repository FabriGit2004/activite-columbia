--
-- PostgreSQL database dump
--

\restrict Rb4tkj2xFGFtB40YIQ9jXfCA2WlDakoLJL1Ot7WBUcmC7V02Wrv3W5wMbiuj69O

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventos (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    fecha date NOT NULL,
    lugar character varying(255),
    fecha_de_envio timestamp without time zone,
    usuario_id integer NOT NULL
);


ALTER TABLE public.eventos OWNER TO postgres;

--
-- Name: eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventos_id_seq OWNER TO postgres;

--
-- Name: eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;


--
-- Name: suscriptores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscriptores (
    id integer NOT NULL,
    usuario_id integer,
    nombre character varying(50),
    telefono character varying(20),
    email character varying(70),
    fecha_registro timestamp without time zone DEFAULT now()
);


ALTER TABLE public.suscriptores OWNER TO postgres;

--
-- Name: suscriptores_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suscriptores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.suscriptores_id_seq OWNER TO postgres;

--
-- Name: suscriptores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscriptores_id_seq OWNED BY public.suscriptores.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    correo character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    nombre character varying(100) NOT NULL,
    pin_confirmacion character varying(10),
    verificado boolean DEFAULT false NOT NULL,
    fecha_registro timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: eventos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);


--
-- Name: suscriptores id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscriptores ALTER COLUMN id SET DEFAULT nextval('public.suscriptores_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventos (id, titulo, fecha, lugar, fecha_de_envio, usuario_id) FROM stdin;
13	Computer Science Week	2026-01-22	Aula Magna Columbia Sede España	2025-10-10 00:00:00	15
20	213123	2025-10-09	23123adwsa	2025-10-15 00:00:00	17
21	asdadasdas	2025-10-16	dasdasdasda	2025-10-29 00:00:00	17
\.


--
-- Data for Name: suscriptores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suscriptores (id, usuario_id, nombre, telefono, email, fecha_registro) FROM stdin;
8	15	Fabrizio Fatecha	+595981530531	fatechafabrizio@hotmail.com	2025-10-06 00:00:00
10	9	Pedro Pérez	+595981234567	juan.perez@example.com	2025-10-05 17:30:00
11	9	Rodri Pérez	+595981234567	juan.perez@example.com	2025-10-05 17:30:00
13	15	Olga Vera	+595983488638	Olga@gmail.com	2025-10-07 00:00:00
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, correo, password_hash, nombre, pin_confirmacion, verificado, fecha_registro) FROM stdin;
9	romipatiño@gmail.com	$2b$10$xCq2q1sDCmOMUrjtgmKQYeHO9elrlYXK1492V0IUCW2jCeIMwaTTK	Rominna Patiño	382058	f	2025-09-28 23:54:24.801594
13	pikachu@gmail.com	$2b$10$8fVBjsZfWqOi7vX1P9RXhOXsSfNBx1tWlAJyz9llQkmDa3ytKaTda	pikachu pokemon	656412	f	2025-09-29 00:08:37.019918
14	ricardoford@gmail.com	$2b$10$e1u0FlE7DbVK3XSUcdQkl.Shb0cyIuqx3yVnn3oO4wjH1QYiYafHu	Ricardo Ford	\N	t	2025-09-29 00:09:43.181438
16	correofalso@gmail.com	$2b$10$bWZRSrO43NH18s/EGUnFle5XyKHuevAjnN8N.4JnDXrqErvCf3IE2	persona falsa	\N	t	2025-10-05 09:49:17.935738
15	fatechafabrizio@hotmail.com	$2b$10$CgHoNyy7wm8XJjyWiMWyb.xX6.Vh87qqT1tyu2SNRWOI0w/VmAQq2	Fabrizio Fatecha	\N	t	2025-10-05 08:20:41.658686
17	fabrimalo@gmail.com	$2b$10$5QwAJpuA2i3rQWhb/DxaOOPZNWDRwCILR3LT6vXVVJGVYyzjon2oa	fabri malo	\N	t	2025-10-06 22:28:55.833792
\.


--
-- Name: eventos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventos_id_seq', 21, true);


--
-- Name: suscriptores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscriptores_id_seq', 13, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 17, true);


--
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- Name: suscriptores suscriptores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscriptores
    ADD CONSTRAINT suscriptores_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: eventos eventos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: suscriptores suscriptores_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscriptores
    ADD CONSTRAINT suscriptores_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Rb4tkj2xFGFtB40YIQ9jXfCA2WlDakoLJL1Ot7WBUcmC7V02Wrv3W5wMbiuj69O

