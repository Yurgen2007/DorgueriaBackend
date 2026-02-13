--
-- PostgreSQL database dump
--

\restrict iWRbyNANka0DXullZ6my81COhYFAt7fCPSggcug0QkkPrJSwcYAnfaKdlGKsG9b

-- Dumped from database version 14.20
-- Dumped by pg_dump version 14.20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: caracteristicas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.caracteristicas (
    id_caracteristica integer NOT NULL,
    nombre character varying(70),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.caracteristicas OWNER TO postgres;

--
-- Name: caracteristicas_id_caracteristica_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.caracteristicas_id_caracteristica_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.caracteristicas_id_caracteristica_seq OWNER TO postgres;

--
-- Name: caracteristicas_id_caracteristica_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.caracteristicas_id_caracteristica_seq OWNED BY public.caracteristicas.id_caracteristica;


--
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    id_categoria integer NOT NULL,
    nombre character varying(70),
    estado boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_id_categoria_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_id_categoria_seq OWNER TO postgres;

--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_id_categoria_seq OWNED BY public.categorias.id_categoria;


--
-- Name: codigo_inventario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.codigo_inventario (
    id_codigo_inventario integer NOT NULL,
    codigo text NOT NULL,
    uso boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_elemento integer
);


ALTER TABLE public.codigo_inventario OWNER TO postgres;

--
-- Name: codigo_inventario_id_codigo_inventario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.codigo_inventario_id_codigo_inventario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.codigo_inventario_id_codigo_inventario_seq OWNER TO postgres;

--
-- Name: codigo_inventario_id_codigo_inventario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.codigo_inventario_id_codigo_inventario_seq OWNED BY public.codigo_inventario.id_codigo_inventario;


--
-- Name: elementos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.elementos (
    id_elemento integer NOT NULL,
    nombre character varying(70),
    descripcion character varying(205),
    estado boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    imagen character varying(255),
    fk_caracteristica integer,
    fk_categoria integer,
    fk_unidad_medida integer,
    fecha_vencimiento date,
    stock integer DEFAULT 0 NOT NULL,
    fk_sitio integer,
    fk_inventario integer,
    codigo_barras character varying(100)
);


ALTER TABLE public.elementos OWNER TO postgres;

--
-- Name: elementos_id_elemento_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.elementos_id_elemento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.elementos_id_elemento_seq OWNER TO postgres;

--
-- Name: elementos_id_elemento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.elementos_id_elemento_seq OWNED BY public.elementos.id_elemento;


--
-- Name: inventarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventarios (
    id_inventario integer NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    nombre character varying(100)
);


ALTER TABLE public.inventarios OWNER TO postgres;

--
-- Name: inventarios_id_inventario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventarios_id_inventario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventarios_id_inventario_seq OWNER TO postgres;

--
-- Name: inventarios_id_inventario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventarios_id_inventario_seq OWNED BY public.inventarios.id_inventario;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: modulos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.modulos (
    id_modulo integer NOT NULL,
    nombre character varying(70),
    descripcion character varying(205),
    href character varying(205),
    icono character varying(205) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    estado boolean
);


ALTER TABLE public.modulos OWNER TO postgres;

--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.modulos_id_modulo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.modulos_id_modulo_seq OWNER TO postgres;

--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.modulos_id_modulo_seq OWNED BY public.modulos.id_modulo;


--
-- Name: notificaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notificaciones (
    id_notificacion integer NOT NULL,
    titulo character varying(205) NOT NULL,
    mensaje character varying(500),
    leido boolean DEFAULT false NOT NULL,
    "requiereAccion" boolean DEFAULT false NOT NULL,
    estado character varying(50),
    data jsonb,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_usuario integer
);


ALTER TABLE public.notificaciones OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notificaciones_id_notificacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notificaciones_id_notificacion_seq OWNER TO postgres;

--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notificaciones_id_notificacion_seq OWNED BY public.notificaciones.id_notificacion;


--
-- Name: permisos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permisos (
    id_permiso integer NOT NULL,
    permiso character varying(100),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_ruta integer
);


ALTER TABLE public.permisos OWNER TO postgres;

--
-- Name: permisos_id_permiso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permisos_id_permiso_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permisos_id_permiso_seq OWNER TO postgres;

--
-- Name: permisos_id_permiso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permisos_id_permiso_seq OWNED BY public.permisos.id_permiso;


--
-- Name: rol_permiso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rol_permiso (
    id_rol_permiso integer NOT NULL,
    estado boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_permiso integer,
    fk_rol integer
);


ALTER TABLE public.rol_permiso OWNER TO postgres;

--
-- Name: rol_permiso_id_rol_permiso_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rol_permiso_id_rol_permiso_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_permiso_id_rol_permiso_seq OWNER TO postgres;

--
-- Name: rol_permiso_id_rol_permiso_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rol_permiso_id_rol_permiso_seq OWNED BY public.rol_permiso.id_rol_permiso;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id_rol integer NOT NULL,
    nombre character varying(70),
    estado boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_rol_seq OWNER TO postgres;

--
-- Name: roles_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_rol_seq OWNED BY public.roles.id_rol;


--
-- Name: rutas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rutas (
    id_ruta integer NOT NULL,
    nombre character varying(205),
    descripcion character varying(205),
    href character varying(205) NOT NULL,
    icono character varying(205),
    listed boolean NOT NULL,
    estado boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    fk_modulo integer
);


ALTER TABLE public.rutas OWNER TO postgres;

--
-- Name: rutas_id_ruta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rutas_id_ruta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rutas_id_ruta_seq OWNER TO postgres;

--
-- Name: rutas_id_ruta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rutas_id_ruta_seq OWNED BY public.rutas.id_ruta;


--
-- Name: sitios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sitios (
    id_sitio integer NOT NULL,
    nombre character varying(70),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    estante character varying(20),
    pasillo character varying(20)
);


ALTER TABLE public.sitios OWNER TO postgres;

--
-- Name: sitios_id_sitio_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sitios_id_sitio_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sitios_id_sitio_seq OWNER TO postgres;

--
-- Name: sitios_id_sitio_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sitios_id_sitio_seq OWNED BY public.sitios.id_sitio;


--
-- Name: unidades_medida; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.unidades_medida (
    id_unidad integer NOT NULL,
    nombre character varying(70) NOT NULL,
    estado boolean NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.unidades_medida OWNER TO postgres;

--
-- Name: unidades_medida_id_unidad_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.unidades_medida_id_unidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unidades_medida_id_unidad_seq OWNER TO postgres;

--
-- Name: unidades_medida_id_unidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.unidades_medida_id_unidad_seq OWNED BY public.unidades_medida.id_unidad;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    documento integer,
    nombre character varying(70),
    apellido character varying(70),
    edad integer,
    telefono character varying(15),
    correo character varying(70),
    estado boolean,
    cargo character varying(70),
    password character varying(60),
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    perfil character varying(255),
    fk_rol integer,
    service_mail character varying(50),
    mail_user character varying(100),
    mail_password character varying(255)
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_usuario_seq OWNER TO postgres;

--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_usuario_seq OWNED BY public.usuarios.id_usuario;


--
-- Name: caracteristicas id_caracteristica; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas ALTER COLUMN id_caracteristica SET DEFAULT nextval('public.caracteristicas_id_caracteristica_seq'::regclass);


--
-- Name: categorias id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN id_categoria SET DEFAULT nextval('public.categorias_id_categoria_seq'::regclass);


--
-- Name: codigo_inventario id_codigo_inventario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo_inventario ALTER COLUMN id_codigo_inventario SET DEFAULT nextval('public.codigo_inventario_id_codigo_inventario_seq'::regclass);


--
-- Name: elementos id_elemento; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos ALTER COLUMN id_elemento SET DEFAULT nextval('public.elementos_id_elemento_seq'::regclass);


--
-- Name: inventarios id_inventario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventarios ALTER COLUMN id_inventario SET DEFAULT nextval('public.inventarios_id_inventario_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: modulos id_modulo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id_modulo SET DEFAULT nextval('public.modulos_id_modulo_seq'::regclass);


--
-- Name: notificaciones id_notificacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones ALTER COLUMN id_notificacion SET DEFAULT nextval('public.notificaciones_id_notificacion_seq'::regclass);


--
-- Name: permisos id_permiso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos ALTER COLUMN id_permiso SET DEFAULT nextval('public.permisos_id_permiso_seq'::regclass);


--
-- Name: rol_permiso id_rol_permiso; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso ALTER COLUMN id_rol_permiso SET DEFAULT nextval('public.rol_permiso_id_rol_permiso_seq'::regclass);


--
-- Name: roles id_rol; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id_rol SET DEFAULT nextval('public.roles_id_rol_seq'::regclass);


--
-- Name: rutas id_ruta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rutas ALTER COLUMN id_ruta SET DEFAULT nextval('public.rutas_id_ruta_seq'::regclass);


--
-- Name: sitios id_sitio; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sitios ALTER COLUMN id_sitio SET DEFAULT nextval('public.sitios_id_sitio_seq'::regclass);


--
-- Name: unidades_medida id_unidad; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida ALTER COLUMN id_unidad SET DEFAULT nextval('public.unidades_medida_id_unidad_seq'::regclass);


--
-- Name: usuarios id_usuario; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuarios_id_usuario_seq'::regclass);


--
-- Data for Name: caracteristicas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.caracteristicas (id_caracteristica, nombre, created_at, updated_at) FROM stdin;
1	caracteristica 1	2026-02-06 09:48:03.795127	2026-02-06 09:48:03.795127
\.


--
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (id_categoria, nombre, estado, created_at, updated_at) FROM stdin;
1	categoria1	t	2026-02-06 10:52:26.955011	2026-02-06 10:52:26.955011
\.


--
-- Data for Name: codigo_inventario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.codigo_inventario (id_codigo_inventario, codigo, uso, created_at, updated_at, fk_elemento) FROM stdin;
\.


--
-- Data for Name: elementos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.elementos (id_elemento, nombre, descripcion, estado, created_at, updated_at, imagen, fk_caracteristica, fk_categoria, fk_unidad_medida, fecha_vencimiento, stock, fk_sitio, fk_inventario, codigo_barras) FROM stdin;
21	acetami	pastilla para el dolor de cabeza 	t	2026-02-12 14:15:51.490551	2026-02-13 11:44:24.833285	elemento-1770930577427-283796177.png	1	1	1	2026-03-04	0	1	1	7701234567821
\.


--
-- Data for Name: inventarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventarios (id_inventario, estado, created_at, updated_at, nombre) FROM stdin;
1	t	2026-02-06 13:31:43.846317	2026-02-06 16:27:03.63438	Bodega1
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1756246972404	Createzapato1756246972404
2	1756250698273	CreateZapato1756250698273
3	1756256829072	Migration1756256829072
4	1756302615686	Migration1756302615686
5	1756308400000	CreateLotesTable1756308400000
6	1756340000000	UpdateSitiosWithEstantePasillo1756340000000
7	1756341000000	RemoveColumnasElemento1756341000000
8	1756342000000	DropTablasUbicacion1756342000000
9	1756342000000	DropTablasUbicacion1756342000000
10	1770310218630	RefactorSchema1770310218630
13	1770315948983	DropTipoSitioTable1770315948983
14	1770317908520	RefactorMovimientos1770317908520
15	1770319252730	RemoveBajaField1770319252730
16	1770390240040	RefactorSitioElementoInventario1770390240040
17	1770411000000	DropMovimientosTables1770411000000
18	1706200000000	DropMovimientosTables1706200000000
19	1706210000000	DropSimboloCaracteristicas1706210000000
20	1770410825679	Migrations1770410825679
21	1770412000000	AddCodigoBarrasToElementos1770412000000
22	1770645000000	AddMailConfigToUsuarios1770645000000
23	1771000000000	SyncCurrentSchema1771000000000
\.


--
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.modulos (id_modulo, nombre, descripcion, href, icono, created_at, updated_at, estado) FROM stdin;
1	Admin	\N	\N	UserIcon	2026-02-12 17:42:48.873581	2026-02-12 17:42:48.873581	t
2	Bodega	\N	\N	ArchiveBoxIcon	2026-02-12 17:42:48.875018	2026-02-12 17:42:48.875018	t
\.


--
-- Data for Name: notificaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notificaciones (id_notificacion, titulo, mensaje, leido, "requiereAccion", estado, data, created_at, fk_usuario) FROM stdin;
225	⚠️ Stock bajo	Stock Bajo: El elemento "acetami" tiene 1 unidades.	f	f	\N	{"stock": 1, "idElemento": 21, "codigoBarras": "7701234567821", "nombreElemento": "acetami"}	2026-02-13 11:28:44.716598	1
226	⚠️ Stock bajo	Stock Bajo: El elemento "acetami" tiene 1 unidades.	f	f	\N	{"stock": 1, "idElemento": 21, "codigoBarras": "7701234567821", "nombreElemento": "acetami"}	2026-02-13 11:28:46.932777	2
227	⚠️ Stock bajo	Stock Bajo: El elemento "acetami" tiene 0 unidades.	f	f	\N	{"stock": 0, "idElemento": 21, "codigoBarras": "7701234567821", "nombreElemento": "acetami"}	2026-02-13 11:44:24.845442	1
228	⚠️ Stock bajo	Stock Bajo: El elemento "acetami" tiene 0 unidades.	f	f	\N	{"stock": 0, "idElemento": 21, "codigoBarras": "7701234567821", "nombreElemento": "acetami"}	2026-02-13 11:44:26.461466	2
\.


--
-- Data for Name: permisos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permisos (id_permiso, permiso, created_at, updated_at, fk_ruta) FROM stdin;
1	Crear Usuario	2026-02-12 17:42:48.994031	2026-02-12 17:42:48.994031	1
2	Registro Masivo	2026-02-12 17:42:48.995557	2026-02-12 17:42:48.995557	1
3	Listar Usuarios	2026-02-12 17:42:48.996989	2026-02-12 17:42:48.996989	1
4	Actualizar Usuario	2026-02-12 17:42:48.998336	2026-02-12 17:42:48.998336	1
5	Eliminar Usuario	2026-02-12 17:42:48.999875	2026-02-12 17:42:48.999875	1
14	Crear Sitio	2026-02-12 17:42:49.001258	2026-02-12 17:42:49.001258	4
15	Listar Sitios	2026-02-12 17:42:49.002498	2026-02-12 17:42:49.002498	4
16	Actualizar Sitio	2026-02-12 17:42:49.003668	2026-02-12 17:42:49.003668	4
17	Eliminar Sitio	2026-02-12 17:42:49.004914	2026-02-12 17:42:49.004914	4
18	Crear Elemento	2026-02-12 17:42:49.006121	2026-02-12 17:42:49.006121	6
19	Listar Elemento	2026-02-12 17:42:49.007299	2026-02-12 17:42:49.007299	6
20	Actualizar Elemento	2026-02-12 17:42:49.008525	2026-02-12 17:42:49.008525	6
21	Eliminar Elemento	2026-02-12 17:42:49.00965	2026-02-12 17:42:49.00965	6
27	Crear Inventario	2026-02-12 17:42:49.010743	2026-02-12 17:42:49.010743	8
28	Limitar Inventario	2026-02-12 17:42:49.011796	2026-02-12 17:42:49.011796	8
29	Listar Inventario	2026-02-12 17:42:49.012906	2026-02-12 17:42:49.012906	8
30	Desactivar Inventario	2026-02-12 17:42:49.01395	2026-02-12 17:42:49.01395	8
33	Crear Rol	2026-02-12 17:42:49.014956	2026-02-12 17:42:49.014956	10
34	Listar Roles	2026-02-12 17:42:49.016045	2026-02-12 17:42:49.016045	10
35	Actualizar Rol	2026-02-12 17:42:49.017171	2026-02-12 17:42:49.017171	10
36	Eliminar Rol	2026-02-12 17:42:49.018205	2026-02-12 17:42:49.018205	10
37	Actualizar Permiso	2026-02-12 17:42:49.019551	2026-02-12 17:42:49.019551	10
38	Asignar Permiso	2026-02-12 17:42:49.021149	2026-02-12 17:42:49.021149	10
59	Crear unidad medida	2026-02-12 17:42:49.022427	2026-02-12 17:42:49.022427	16
60	Listar unidad medida	2026-02-12 17:42:49.023554	2026-02-12 17:42:49.023554	16
61	Actualizar unidad medida	2026-02-12 17:42:49.024595	2026-02-12 17:42:49.024595	16
62	Eliminar unidad medida	2026-02-12 17:42:49.025702	2026-02-12 17:42:49.025702	16
63	Crear categoria	2026-02-12 17:42:49.026857	2026-02-12 17:42:49.026857	17
64	Listar categoria	2026-02-12 17:42:49.027983	2026-02-12 17:42:49.027983	17
65	Actualizar categoria	2026-02-12 17:42:49.029067	2026-02-12 17:42:49.029067	17
66	Eliminar categoria	2026-02-12 17:42:49.030131	2026-02-12 17:42:49.030131	17
67	Crear caracteristica	2026-02-12 17:42:49.031136	2026-02-12 17:42:49.031136	18
68	Listar caracteristicas	2026-02-12 17:42:49.032544	2026-02-12 17:42:49.032544	18
69	Actualizar caracteristica	2026-02-12 17:42:49.034546	2026-02-12 17:42:49.034546	18
70	Eliminar caracteristica	2026-02-12 17:42:49.035836	2026-02-12 17:42:49.035836	18
71	Exportar PDF	2026-02-12 17:42:49.037007	2026-02-12 17:42:49.037007	6
72	Vender	2026-02-12 17:42:49.038103	2026-02-12 17:42:49.038103	6
\.


--
-- Data for Name: rol_permiso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rol_permiso (id_rol_permiso, estado, created_at, updated_at, fk_permiso, fk_rol) FROM stdin;
1	t	2026-02-12 17:42:49.039358	2026-02-12 17:42:49.039358	1	1
2	t	2026-02-12 17:42:49.052736	2026-02-12 17:42:49.052736	2	1
3	t	2026-02-12 17:42:49.054925	2026-02-12 17:42:49.054925	3	1
4	t	2026-02-12 17:42:49.070617	2026-02-12 17:42:49.070617	4	1
5	t	2026-02-12 17:42:49.073757	2026-02-12 17:42:49.073757	5	1
14	t	2026-02-12 17:42:49.076451	2026-02-12 17:42:49.076451	14	1
15	t	2026-02-12 17:42:49.079605	2026-02-12 17:42:49.079605	15	1
16	t	2026-02-12 17:42:49.08438	2026-02-12 17:42:49.08438	16	1
17	t	2026-02-12 17:42:49.08894	2026-02-12 17:42:49.08894	17	1
18	t	2026-02-12 17:42:49.092496	2026-02-12 17:42:49.092496	18	1
19	t	2026-02-12 17:42:49.096097	2026-02-12 17:42:49.096097	19	1
20	t	2026-02-12 17:42:49.103524	2026-02-12 17:42:49.103524	20	1
21	t	2026-02-12 17:42:49.107451	2026-02-12 17:42:49.107451	21	1
27	t	2026-02-12 17:42:49.113459	2026-02-12 17:42:49.113459	27	1
28	t	2026-02-12 17:42:49.1189	2026-02-12 17:42:49.1189	28	1
29	t	2026-02-12 17:42:49.122369	2026-02-12 17:42:49.122369	29	1
30	t	2026-02-12 17:42:49.125576	2026-02-12 17:42:49.125576	30	1
33	t	2026-02-12 17:42:49.129202	2026-02-12 17:42:49.129202	33	1
34	t	2026-02-12 17:42:49.134581	2026-02-12 17:42:49.134581	34	1
35	t	2026-02-12 17:42:49.150749	2026-02-12 17:42:49.150749	35	1
36	t	2026-02-12 17:42:49.155766	2026-02-12 17:42:49.155766	36	1
37	t	2026-02-12 17:42:49.158737	2026-02-12 17:42:49.158737	37	1
38	t	2026-02-12 17:42:49.190568	2026-02-12 17:42:49.190568	38	1
59	t	2026-02-12 17:42:49.228425	2026-02-12 17:42:49.228425	59	1
60	t	2026-02-12 17:42:49.249261	2026-02-12 17:42:49.249261	60	1
61	t	2026-02-12 17:42:49.252281	2026-02-12 17:42:49.252281	61	1
62	t	2026-02-12 17:42:49.25563	2026-02-12 17:42:49.25563	62	1
63	t	2026-02-12 17:42:49.259114	2026-02-12 17:42:49.259114	63	1
64	t	2026-02-12 17:42:49.262992	2026-02-12 17:42:49.262992	64	1
65	t	2026-02-12 17:42:49.267218	2026-02-12 17:42:49.267218	65	1
66	t	2026-02-12 17:42:49.273879	2026-02-12 17:42:49.273879	66	1
67	t	2026-02-12 17:42:49.280703	2026-02-12 17:42:49.280703	67	1
68	t	2026-02-12 17:42:49.287594	2026-02-12 17:42:49.287594	68	1
69	t	2026-02-12 17:42:49.291425	2026-02-12 17:42:49.291425	69	1
70	t	2026-02-12 17:42:49.293955	2026-02-12 17:42:49.293955	70	1
71	t	2026-02-12 17:42:49.298647	2026-02-12 17:42:49.298647	71	1
72	t	2026-02-12 17:42:49.303682	2026-02-12 17:42:49.303682	72	1
73	t	2026-02-12 17:42:49.307458	2026-02-12 17:42:49.307458	19	2
74	t	2026-02-12 17:42:49.312251	2026-02-12 17:42:49.312251	29	2
75	t	2026-02-12 17:42:49.316709	2026-02-12 17:42:49.316709	72	2
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id_rol, nombre, estado, created_at, updated_at) FROM stdin;
1	Administrador	t	2026-02-12 17:42:48.870257	2026-02-12 17:42:48.870257
2	Vendedor	t	2026-02-12 17:42:48.872143	2026-02-12 17:42:48.872143
\.


--
-- Data for Name: rutas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rutas (id_ruta, nombre, descripcion, href, icono, listed, estado, created_at, updated_at, fk_modulo) FROM stdin;
1	Usuarios	\N	admin/usuarios	UserIcon	t	t	2026-02-12 17:42:48.980778	2026-02-12 17:42:48.980778	1
4	Sitios	\N	admin/sitios	BuildingOfficeIcon	t	t	2026-02-12 17:42:48.983028	2026-02-12 17:42:48.983028	1
6	Elementos	\N	bodega/elementos	CubeIcon	t	t	2026-02-12 17:42:48.985411	2026-02-12 17:42:48.985411	2
8	Inventarios	\N	bodega/inventario	ClipboardDocumentListIcon	t	t	2026-02-12 17:42:48.987023	2026-02-12 17:42:48.987023	2
10	Roles	\N	admin/roles	\N	f	t	2026-02-12 17:42:48.988551	2026-02-12 17:42:48.988551	1
16	Unidades medida	\N	bodega/unidades	\N	f	t	2026-02-12 17:42:48.989982	2026-02-12 17:42:48.989982	2
17	Categorias	\N	bodega/categorias	\N	f	t	2026-02-12 17:42:48.991317	2026-02-12 17:42:48.991317	2
18	Caracteristicas	\N	bodega/caracteristicas	\N	f	t	2026-02-12 17:42:48.992683	2026-02-12 17:42:48.992683	2
\.


--
-- Data for Name: sitios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sitios (id_sitio, nombre, created_at, updated_at, estante, pasillo) FROM stdin;
1	Analgesicos	2026-02-06 09:30:30.283182	2026-02-06 09:30:30.283182	1	3
\.


--
-- Data for Name: unidades_medida; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.unidades_medida (id_unidad, nombre, estado, created_at, updated_at) FROM stdin;
1	gr	t	2026-02-05 15:33:05.471756	2026-02-10 16:34:29.391378
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, documento, nombre, apellido, edad, telefono, correo, estado, cargo, password, created_at, updated_at, perfil, fk_rol, service_mail, mail_user, mail_password) FROM stdin;
1	123456789	Admin	System	30	3001234567	farmamedicadrogueria48@gmail.com	t	Administrador	$2b$10$bx8kQEs5FoMtH3pYG2cBQepyrQlF35jiPJpPVzQrO4zDrAi/Y4C3K	2026-02-12 17:42:48.92699	2026-02-12 17:42:48.92699	defaultPerfil.png	1	gmail	farmamedicadrogueria48@gmail.com	wdis nwbw lgkg rivo
2	111222	Vendedor	Default	25	3000000000	vendedor@farmamedica.com	t	vendedor	$2b$10$zfzOmiNwE5UreHJY60H9M.tOlQMTVWNSK0km9692qpXAjFeHpb9kO	2026-02-12 17:42:48.978523	2026-02-12 17:42:48.978523	1771000098764-6-.png	2	\N	\N	\N
\.


--
-- Name: caracteristicas_id_caracteristica_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.caracteristicas_id_caracteristica_seq', 2, true);


--
-- Name: categorias_id_categoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_id_categoria_seq', 1, true);


--
-- Name: codigo_inventario_id_codigo_inventario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.codigo_inventario_id_codigo_inventario_seq', 1, false);


--
-- Name: elementos_id_elemento_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.elementos_id_elemento_seq', 21, true);


--
-- Name: inventarios_id_inventario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventarios_id_inventario_seq', 4, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 23, true);


--
-- Name: modulos_id_modulo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.modulos_id_modulo_seq', 3, true);


--
-- Name: notificaciones_id_notificacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notificaciones_id_notificacion_seq', 228, true);


--
-- Name: permisos_id_permiso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permisos_id_permiso_seq', 70, true);


--
-- Name: rol_permiso_id_rol_permiso_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rol_permiso_id_rol_permiso_seq', 89, true);


--
-- Name: roles_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_rol_seq', 3, true);


--
-- Name: rutas_id_ruta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rutas_id_ruta_seq', 19, true);


--
-- Name: sitios_id_sitio_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sitios_id_sitio_seq', 2, true);


--
-- Name: unidades_medida_id_unidad_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.unidades_medida_id_unidad_seq', 3, true);


--
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 8, true);


--
-- Name: categorias PK_04bae980e284752e914bce1cbc7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT "PK_04bae980e284752e914bce1cbc7" PRIMARY KEY (id_categoria);


--
-- Name: rol_permiso PK_151312cfdb886f6d9dc19f9ccfd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT "PK_151312cfdb886f6d9dc19f9ccfd" PRIMARY KEY (id_rol_permiso);


--
-- Name: elementos PK_1d2dba8c68f03b6d62478514622; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "PK_1d2dba8c68f03b6d62478514622" PRIMARY KEY (id_elemento);


--
-- Name: roles PK_25f8d4161f00a1dd1cbe5068695; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_25f8d4161f00a1dd1cbe5068695" PRIMARY KEY (id_rol);


--
-- Name: inventarios PK_2c4442a91d7530d5b410d640d8c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventarios
    ADD CONSTRAINT "PK_2c4442a91d7530d5b410d640d8c" PRIMARY KEY (id_inventario);


--
-- Name: caracteristicas PK_52e73803f4f7ca4fa6ef0954cba; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.caracteristicas
    ADD CONSTRAINT "PK_52e73803f4f7ca4fa6ef0954cba" PRIMARY KEY (id_caracteristica);


--
-- Name: rutas PK_5969d8e88a11612682925e9275a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rutas
    ADD CONSTRAINT "PK_5969d8e88a11612682925e9275a" PRIMARY KEY (id_ruta);


--
-- Name: modulos PK_68ad50fa332064a72e31fcdf87a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT "PK_68ad50fa332064a72e31fcdf87a" PRIMARY KEY (id_modulo);


--
-- Name: sitios PK_726f70836f94825b76c974b5d24; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sitios
    ADD CONSTRAINT "PK_726f70836f94825b76c974b5d24" PRIMARY KEY (id_sitio);


--
-- Name: permisos PK_76e2dbb965cd631705b6caaf698; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT "PK_76e2dbb965cd631705b6caaf698" PRIMARY KEY (id_permiso);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: unidades_medida PK_ca39afd476a07a87d3c3faf916c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.unidades_medida
    ADD CONSTRAINT "PK_ca39afd476a07a87d3c3faf916c" PRIMARY KEY (id_unidad);


--
-- Name: usuarios PK_dfe59db369749f9042499fd8107; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_dfe59db369749f9042499fd8107" PRIMARY KEY (id_usuario);


--
-- Name: notificaciones PK_ff498b8eb6b226a9fc52889ddac; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "PK_ff498b8eb6b226a9fc52889ddac" PRIMARY KEY (id_notificacion);


--
-- Name: codigo_inventario PK_ffdecb48e8c3f594845b0ab4e56; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo_inventario
    ADD CONSTRAINT "PK_ffdecb48e8c3f594845b0ab4e56" PRIMARY KEY (id_codigo_inventario);


--
-- Name: usuarios UQ_604e2077971f192d85cffb5c437; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "UQ_604e2077971f192d85cffb5c437" UNIQUE (documento);


--
-- Name: IDX_elementos_codigo_barras; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_elementos_codigo_barras" ON public.elementos USING btree (codigo_barras);


--
-- Name: idx_codigo_inventario_fk_elemento; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_codigo_inventario_fk_elemento ON public.codigo_inventario USING btree (fk_elemento);


--
-- Name: idx_elementos_fk_categoria; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_elementos_fk_categoria ON public.elementos USING btree (fk_categoria);


--
-- Name: idx_elementos_fk_inventario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_elementos_fk_inventario ON public.elementos USING btree (fk_inventario);


--
-- Name: idx_elementos_fk_sitio; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_elementos_fk_sitio ON public.elementos USING btree (fk_sitio);


--
-- Name: idx_notificaciones_fk_usuario; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_notificaciones_fk_usuario ON public.notificaciones USING btree (fk_usuario);


--
-- Name: idx_permisos_fk_ruta; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_permisos_fk_ruta ON public.permisos USING btree (fk_ruta);


--
-- Name: idx_rol_permiso_fk_permiso; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rol_permiso_fk_permiso ON public.rol_permiso USING btree (fk_permiso);


--
-- Name: idx_rol_permiso_fk_rol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rol_permiso_fk_rol ON public.rol_permiso USING btree (fk_rol);


--
-- Name: idx_rutas_fk_modulo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_rutas_fk_modulo ON public.rutas USING btree (fk_modulo);


--
-- Name: idx_usuarios_fk_rol; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_usuarios_fk_rol ON public.usuarios USING btree (fk_rol);


--
-- Name: permisos FK_201e212c6b7ce88de3b1d9d0799; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permisos
    ADD CONSTRAINT "FK_201e212c6b7ce88de3b1d9d0799" FOREIGN KEY (fk_ruta) REFERENCES public.rutas(id_ruta) ON DELETE CASCADE;


--
-- Name: usuarios FK_2debd80fc8ffea2584356b81313; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "FK_2debd80fc8ffea2584356b81313" FOREIGN KEY (fk_rol) REFERENCES public.roles(id_rol);


--
-- Name: elementos FK_497a0834d12d795d63e9de6b20d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "FK_497a0834d12d795d63e9de6b20d" FOREIGN KEY (fk_sitio) REFERENCES public.sitios(id_sitio);


--
-- Name: codigo_inventario FK_4c0a5ddda14989500e9a6e10a3d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo_inventario
    ADD CONSTRAINT "FK_4c0a5ddda14989500e9a6e10a3d" FOREIGN KEY (fk_elemento) REFERENCES public.elementos(id_elemento);


--
-- Name: notificaciones FK_77a0ebfb81a5cb8e3852c75e0a8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "FK_77a0ebfb81a5cb8e3852c75e0a8" FOREIGN KEY (fk_usuario) REFERENCES public.usuarios(id_usuario);


--
-- Name: elementos FK_9307c5cdfa801c78b37b51fd5bc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "FK_9307c5cdfa801c78b37b51fd5bc" FOREIGN KEY (fk_caracteristica) REFERENCES public.caracteristicas(id_caracteristica);


--
-- Name: rol_permiso FK_a06c4f160e4c589da93f7c191bf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT "FK_a06c4f160e4c589da93f7c191bf" FOREIGN KEY (fk_permiso) REFERENCES public.permisos(id_permiso);


--
-- Name: rutas FK_a97abdad35a72da8da3be972021; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rutas
    ADD CONSTRAINT "FK_a97abdad35a72da8da3be972021" FOREIGN KEY (fk_modulo) REFERENCES public.modulos(id_modulo);


--
-- Name: rol_permiso FK_ba15da702a0f5d500588c597a9d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rol_permiso
    ADD CONSTRAINT "FK_ba15da702a0f5d500588c597a9d" FOREIGN KEY (fk_rol) REFERENCES public.roles(id_rol);


--
-- Name: elementos FK_ea006bdbbdba2d09b7ea278eb4c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "FK_ea006bdbbdba2d09b7ea278eb4c" FOREIGN KEY (fk_unidad_medida) REFERENCES public.unidades_medida(id_unidad);


--
-- Name: elementos FK_ee71b54709343b5af18d62a853e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "FK_ee71b54709343b5af18d62a853e" FOREIGN KEY (fk_categoria) REFERENCES public.categorias(id_categoria);


--
-- Name: elementos FK_fe5217635d2816d5b5f4abe0b12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.elementos
    ADD CONSTRAINT "FK_fe5217635d2816d5b5f4abe0b12" FOREIGN KEY (fk_inventario) REFERENCES public.inventarios(id_inventario);


--
-- PostgreSQL database dump complete
--

\unrestrict iWRbyNANka0DXullZ6my81COhYFAt7fCPSggcug0QkkPrJSwcYAnfaKdlGKsG9b

