--
-- PostgreSQL database dump
--

-- Dumped from database version 9.3.5
-- Dumped by pg_dump version 9.3.5
-- Started on 2014-11-05 22:06:08 AST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 177 (class 3079 OID 12018)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2257 (class 0 OID 0)
-- Dependencies: 177
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

--
-- TOC entry 191 (class 1255 OID 33116)
-- Name: block_item_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION block_item_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
Declare Begin 
	IF New.thumbsdown >5 OR New.isblocked ='true' Then
	
	  new.isBlocked = 'true' ;
	  update users set isblocked = 'true' where email = new.email;
	  update comment set isblocked ='true' where email = new.email;
	
	
	Return new;
	End IF;
	
	Return new;
End;
$$;


ALTER FUNCTION public.block_item_user() OWNER TO postgres;

--
-- TOC entry 190 (class 1255 OID 33159)
-- Name: block_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION block_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
Declare Begin 
	IF New.isblocked ='true' and Old.isblocked = 'false' Then

	  update item set isblocked = 'true' where email = new.email;
	  update comment set isblocked ='true' where email = new.email;

	Return new;
	End IF;
	
	Return new;
End;
$$;


ALTER FUNCTION public.block_user() OWNER TO postgres;

--
-- TOC entry 192 (class 1255 OID 33091)
-- Name: insert_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION insert_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
Declare Begin 
	IF New.email In (select email from users) Then	
	Return New;
	End IF;
	Insert into users(email) values (New.email);
	Return New;
End;
$$;


ALTER FUNCTION public.insert_user() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 174 (class 1259 OID 24866)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE comment (
    commentid integer NOT NULL,
    itemid bigint,
    usercomment character(200),
    email character(40) NOT NULL,
    isblocked character varying DEFAULT false NOT NULL
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 24864)
-- Name: comment_commentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comment_commentid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_commentid_seq OWNER TO postgres;

--
-- TOC entry 2258 (class 0 OID 0)
-- Dependencies: 173
-- Name: comment_commentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comment_commentid_seq OWNED BY comment.commentid;


--
-- TOC entry 176 (class 1259 OID 24884)
-- Name: feedback; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE feedback (
    feedbackid integer NOT NULL,
    message character(300) NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.feedback OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 24882)
-- Name: feedback_feedbackid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE feedback_feedbackid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_feedbackid_seq OWNER TO postgres;

--
-- TOC entry 2259 (class 0 OID 0)
-- Dependencies: 175
-- Name: feedback_feedbackid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE feedback_feedbackid_seq OWNED BY feedback.feedbackid;


--
-- TOC entry 172 (class 1259 OID 24845)
-- Name: item; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item (
    itemid integer NOT NULL,
    itemname character varying NOT NULL,
    description character varying NOT NULL,
    locationitem character varying,
    city character varying,
    itemstatus character varying NOT NULL,
    itemdate date DEFAULT ('now'::text)::date NOT NULL,
    itempicture character varying,
    itemsuccessdate date,
    enablenotification character varying DEFAULT false NOT NULL,
    itemviews bigint DEFAULT 0 NOT NULL,
    thumbsdown bigint DEFAULT 0 NOT NULL,
    email character(40) NOT NULL,
    isblocked character varying DEFAULT false NOT NULL,
    category character varying NOT NULL
);


ALTER TABLE public.item OWNER TO postgres;

--
-- TOC entry 171 (class 1259 OID 24843)
-- Name: item_itemid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_itemid_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_itemid_seq OWNER TO postgres;

--
-- TOC entry 2260 (class 0 OID 0)
-- Dependencies: 171
-- Name: item_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_itemid_seq OWNED BY item.itemid;


--
-- TOC entry 170 (class 1259 OID 24826)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE users (
    firstname character(30),
    lastname character(30),
    email character varying NOT NULL,
    phone character(12),
    passkey character varying,
    isblocked character varying DEFAULT false NOT NULL,
    isadmin character varying DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2120 (class 2604 OID 24869)
-- Name: commentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment ALTER COLUMN commentid SET DEFAULT nextval('comment_commentid_seq'::regclass);


--
-- TOC entry 2122 (class 2604 OID 24887)
-- Name: feedbackid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY feedback ALTER COLUMN feedbackid SET DEFAULT nextval('feedback_feedbackid_seq'::regclass);


--
-- TOC entry 2114 (class 2604 OID 24848)
-- Name: itemid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item ALTER COLUMN itemid SET DEFAULT nextval('item_itemid_seq'::regclass);


--
-- TOC entry 2247 (class 0 OID 24866)
-- Dependencies: 174
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comment (commentid, itemid, usercomment, email, isblocked) FROM stdin;
2	1	Luis comment Jacket                                                                                                                                                                                     	luis.rivera132@upr.edu                  	false
1	1	Maria comment Jacket                                                                                                                                                                                    	maria.rivera30@upr.edu                  	false
3	2	Irving comment Tablet                                                                                                                                                                                   	irving.ramirez@upr.edu                  	false
\.


--
-- TOC entry 2261 (class 0 OID 0)
-- Dependencies: 173
-- Name: comment_commentid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comment_commentid_seq', 6, true);


--
-- TOC entry 2249 (class 0 OID 24884)
-- Dependencies: 176
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY feedback (feedbackid, message, email) FROM stdin;
1	undefined                                                                                                                                                                                                                                                                                                   	undefined
\.


--
-- TOC entry 2262 (class 0 OID 0)
-- Dependencies: 175
-- Name: feedback_feedbackid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('feedback_feedbackid_seq', 1, true);


--
-- TOC entry 2245 (class 0 OID 24845)
-- Dependencies: 172
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY item (itemid, itemname, description, locationitem, city, itemstatus, itemdate, itempicture, itemsuccessdate, enablenotification, itemviews, thumbsdown, email, isblocked, category) FROM stdin;
3	Camera	Mi camera es roja	Fisica	Mayaguez	Found	2014-04-05	http://static.photo.net/v3graphics/20140428/equipment/medium/2964.jpg	\N	false	10	0	irving.ramirez@upr.edu                  	false	Electronics
2	Tabletawrvwk	Mi tablet estaba en el Bano de mu	Stef	May	Lost	2014-11-11	http://i00.i.aliimg.com/photo/v0/353397906/10_inch_TABLET_PC_Talet_computer_10.jpg	\N	false	11	0	angel.delatorre@upr.edu                 	false	Electronics
1	Jacket	Lo Encontre en el  Lobby	Stefanie	Mayguez	Found	2014-11-11	http://www.vivetumoto.com/foros/attachments/chaquetas-motociclistas/2873d1356133608t-vendo-hermosa-chaqueta-icon-overlord-typer-1-dsc_0473-1-.jpg	\N	false	5	0	maria.rivera30@upr.edu                  	false	Clothes
4	Hat	Small hat	Monzon	Mayaguez	Lost	2013-10-11	https://cdn.usetopscore.com/uploads/93/media_items/chic-pink-cowgirl-hat.original.jpg	\N	false	10000	1	maria.rivera30@upr.edu                  	false	Clothes
\.


--
-- TOC entry 2263 (class 0 OID 0)
-- Dependencies: 171
-- Name: item_itemid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('item_itemid_seq', 132, true);


--
-- TOC entry 2243 (class 0 OID 24826)
-- Dependencies: 170
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (firstname, lastname, email, phone, passkey, isblocked, isadmin) FROM stdin;
Maria                         	Rivera                        	maria.rivera30@upr.edu	787635515   	858	false	false
luis                          	Rivera                        	luis.rivera132@upr.edu	787635515   	858	false	false
Angel                         	De La Torre                   	angel.delatorre@upr.edu	787635515   	007	false	false
Irving                        	Ramirez                       	irving.ramirez@upr.edu	787635515   	858	false	false
Amir                          	Chinaei                       	amir@upr.edu	7876757484  	1233	false	false
\N	\N	5	\N	\N	false	false
\.


--
-- TOC entry 2128 (class 2606 OID 24871)
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (commentid);


--
-- TOC entry 2130 (class 2606 OID 24892)
-- Name: feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (feedbackid);


--
-- TOC entry 2126 (class 2606 OID 24853)
-- Name: item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_pkey PRIMARY KEY (itemid);


--
-- TOC entry 2124 (class 2606 OID 33184)
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- TOC entry 2134 (class 2620 OID 33165)
-- Name: add_thumbsdown; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_thumbsdown AFTER UPDATE ON item FOR EACH ROW EXECUTE PROCEDURE block_item_user();


--
-- TOC entry 2133 (class 2620 OID 33166)
-- Name: admin_block_user; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER admin_block_user AFTER UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE block_user();


--
-- TOC entry 2135 (class 2620 OID 33115)
-- Name: insert_item; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER insert_item BEFORE INSERT ON item FOR EACH ROW EXECUTE PROCEDURE insert_user();


--
-- TOC entry 2132 (class 2606 OID 24872)
-- Name: comment_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comment
    ADD CONSTRAINT comment_itemid_fkey FOREIGN KEY (itemid) REFERENCES item(itemid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2131 (class 2606 OID 33185)
-- Name: item_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item
    ADD CONSTRAINT item_email_fkey FOREIGN KEY (email) REFERENCES users(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2256 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2014-11-05 22:06:08 AST

--
-- PostgreSQL database dump complete
--

