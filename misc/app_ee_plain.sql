--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-01 01:54:40

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

--
-- TOC entry 4880 (class 1262 OID 16466)
-- Name: ee_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ee_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_World.1252';


ALTER DATABASE ee_app OWNER TO postgres;

\connect ee_app

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
-- TOC entry 222 (class 1259 OID 16492)
-- Name: consumption; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.consumption (
    consumption_id bigint NOT NULL,
    metering_point_id bigint NOT NULL,
    amount numeric(38,2) NOT NULL,
    amount_unit character varying(255) NOT NULL,
    consumption_time timestamp with time zone NOT NULL
);


ALTER TABLE public.consumption OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16491)
-- Name: consumption_consumption_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.consumption_consumption_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.consumption_consumption_id_seq OWNER TO postgres;

--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 221
-- Name: consumption_consumption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.consumption_consumption_id_seq OWNED BY public.consumption.consumption_id;


--
-- TOC entry 218 (class 1259 OID 16468)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16467)
-- Name: customers_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_customer_id_seq OWNER TO postgres;

--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 217
-- Name: customers_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_customer_id_seq OWNED BY public.customers.customer_id;


--
-- TOC entry 220 (class 1259 OID 16480)
-- Name: metering_points; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.metering_points (
    metering_point_id bigint NOT NULL,
    customer_id bigint NOT NULL,
    address character varying(255) NOT NULL
);


ALTER TABLE public.metering_points OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16479)
-- Name: metering_points_metering_point_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.metering_points_metering_point_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.metering_points_metering_point_id_seq OWNER TO postgres;

--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 219
-- Name: metering_points_metering_point_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.metering_points_metering_point_id_seq OWNED BY public.metering_points.metering_point_id;


--
-- TOC entry 4713 (class 2604 OID 16495)
-- Name: consumption consumption_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumption ALTER COLUMN consumption_id SET DEFAULT nextval('public.consumption_consumption_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 16471)
-- Name: customers customer_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_customer_id_seq'::regclass);


--
-- TOC entry 4712 (class 2604 OID 16483)
-- Name: metering_points metering_point_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metering_points ALTER COLUMN metering_point_id SET DEFAULT nextval('public.metering_points_metering_point_id_seq'::regclass);


--
-- TOC entry 4874 (class 0 OID 16492)
-- Dependencies: 222
-- Data for Name: consumption; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.consumption (consumption_id, metering_point_id, amount, amount_unit, consumption_time) FROM stdin;
1	3	50.50	kWh	2024-02-01 10:30:00+02
2	4	30.20	kWh	2024-02-01 14:15:00+02
3	3	75.80	kWh	2024-06-01 18:45:00+03
4	3	90.10	kWh	2024-07-01 21:00:00+03
5	4	45.00	kWh	2024-03-02 11:20:00+02
6	5	60.40	kWh	2024-08-02 17:10:00+03
7	5	20.70	kWh	2024-02-03 12:50:00+02
8	6	55.90	kWh	2024-02-03 18:30:00+02
9	3	50.50	kWh	2023-02-01 10:30:00+02
10	4	30.20	kWh	2023-02-01 14:15:00+02
11	3	75.80	kWh	2025-01-10 17:45:00+02
12	3	14.50	kWh	2024-02-07 10:30:00+02
\.


--
-- TOC entry 4870 (class 0 OID 16468)
-- Dependencies: 218
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, first_name, last_name, username, password) FROM stdin;
2	John	Doe	testuser	$2a$10$4gNbSSKmwymiRaaLVFjuj.zHoQDAL1gBF26fmzkKqKIXlP1mKIlhy
3	John	Doe2	test2	$2a$10$.mnju3V3PwpbXOcyl8Af7uypiZmH3.y9w1HbxH/K55k6NW.2300pq
1	Tiit	Test	test	$2a$10$38.89qXsoGrbmGH0hZ8s1OJe/Vv3Ky3VpCToKLDMI7sYrSsPpmTCy
7	Teet	Test	teet	$2a$10$N8c0L9NTI40Py87ZU2KAQetUCDfxW4Yw3b53jpA4YmLtzN2unFue6
4	John	Doe3	test3	$2a$10$wQkSJ7yyd4N1pnVAxNvczuy1l4XCZ8yETZbvmjmVNJnRGHRtmNe4S
8	Tiit	Test2	tiit	$2a$10$5cEi9pKFqfsgvRYQxTGKiuA464UL5SjaUzFOxt8NbBx16zXvP0zuW
\.


--
-- TOC entry 4872 (class 0 OID 16480)
-- Dependencies: 220
-- Data for Name: metering_points; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.metering_points (metering_point_id, customer_id, address) FROM stdin;
3	1	Other house 333
4	1	Street 123
5	3	Third house 321
6	7	Street 123
\.


--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 221
-- Name: consumption_consumption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.consumption_consumption_id_seq', 12, true);


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 217
-- Name: customers_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_customer_id_seq', 8, true);


--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 219
-- Name: metering_points_metering_point_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.metering_points_metering_point_id_seq', 6, true);


--
-- TOC entry 4721 (class 2606 OID 16499)
-- Name: consumption consumption_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumption
    ADD CONSTRAINT consumption_pkey PRIMARY KEY (consumption_id);


--
-- TOC entry 4715 (class 2606 OID 16475)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 4717 (class 2606 OID 16477)
-- Name: customers customers_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);


--
-- TOC entry 4719 (class 2606 OID 16485)
-- Name: metering_points metering_points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metering_points
    ADD CONSTRAINT metering_points_pkey PRIMARY KEY (metering_point_id);


--
-- TOC entry 4723 (class 2606 OID 16500)
-- Name: consumption consumption_metering_point_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.consumption
    ADD CONSTRAINT consumption_metering_point_id_fkey FOREIGN KEY (metering_point_id) REFERENCES public.metering_points(metering_point_id) ON DELETE CASCADE;


--
-- TOC entry 4722 (class 2606 OID 16486)
-- Name: metering_points metering_points_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.metering_points
    ADD CONSTRAINT metering_points_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id) ON DELETE CASCADE;


-- Completed on 2025-02-01 01:54:41

--
-- PostgreSQL database dump complete
--

