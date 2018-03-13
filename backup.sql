--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bulletinboard; Type: TABLE; Schema: public; Owner: philipvalentini
--

CREATE TABLE bulletinboard (
    id integer NOT NULL,
    name character varying(255) DEFAULT 'Guest'::character varying,
    quote character varying(2000) NOT NULL
);


ALTER TABLE bulletinboard OWNER TO philipvalentini;

--
-- Name: bulletinboard_id_seq; Type: SEQUENCE; Schema: public; Owner: philipvalentini
--

CREATE SEQUENCE bulletinboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE bulletinboard_id_seq OWNER TO philipvalentini;

--
-- Name: bulletinboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: philipvalentini
--

ALTER SEQUENCE bulletinboard_id_seq OWNED BY bulletinboard.id;


--
-- Name: bulletinboard id; Type: DEFAULT; Schema: public; Owner: philipvalentini
--

ALTER TABLE ONLY bulletinboard ALTER COLUMN id SET DEFAULT nextval('bulletinboard_id_seq'::regclass);


--
-- Data for Name: bulletinboard; Type: TABLE DATA; Schema: public; Owner: philipvalentini
--

COPY bulletinboard (id, name, quote) FROM stdin;
1	William Shakespeare	"To be or not to be, that is the question?"
4	Anonymous	"You only live once!"
3	Anonymous	"Fear the Reaper!"
6	James Bond	"My name is Bond, James Bond."
11	Jane Doe	"Go big or go home!"
12	Ricky Bobby	"You're either first or you're last!"
2	John Doe	"its best to think before you speak."
5	Rick Flair	"Wooooooooo!"
7	The Joker	"Say it with a smile!"
13	Jim Carrey	"Behind every man is a woman rolling her eyes. "
14	Kierkegaard	" Life must be lived forwards, but can only be understood backwards."
16	yoda	" powerful you have become, the dark side i sense in you"
17	Karen Lazarovic	"Do it right or don't do it al all. "
18	Mark Lazarovic	"Did You Earn What You Ate Today?"
19	Michael Lazarovic	"Fear is cause of all negativity."
20	Julius Ceasar as per William Shakespeare	"Et Tu Brute?"
21	Laid back - Band	" If you're gonna ride, don't ride the white horse!"
15	buddha	"The trouble is, you think you have time. "
22	Maya Angelou	"Try to be a rainbow in someone's cloud. "
23	Salvador Dali	"Have No Fear of Perfection, because you will never reach it. "
\.


--
-- Name: bulletinboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: philipvalentini
--

SELECT pg_catalog.setval('bulletinboard_id_seq', 23, true);


--
-- Name: bulletinboard bulletinboard_pkey; Type: CONSTRAINT; Schema: public; Owner: philipvalentini
--

ALTER TABLE ONLY bulletinboard
    ADD CONSTRAINT bulletinboard_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

