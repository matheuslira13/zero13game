create extension if not exists "pgcrypto";

create type tipo_campeonato as enum ('aberto', 'fechado');
create type status_campeonato as enum ('disponivel', 'indisponivel', 'finalizado', 'cancelado');

create table public.administradores (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  criado_em timestamptz not null default now()
);

create table public.competidores (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  apelido text not null,
  telefone text,
  foto_url text,
  criado_em timestamptz not null default now()
);

create table public.jogos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  descricao text,
  imagem_url text,
  criado_em timestamptz not null default now()
);

create table public.campeonatos (
  id uuid primary key default gen_random_uuid(),
  jogo_id uuid references public.jogos(id) on delete restrict,
  titulo text not null,
  descricao text,
  numero_maximo_participantes int not null,
  local text not null,
  data_evento timestamptz not null,
  tipo tipo_campeonato not null default 'aberto',
  status status_campeonato not null default 'disponivel',
  criado_em timestamptz not null default now(),

  constraint numero_maximo_participantes_maior_que_zero
    check (numero_maximo_participantes > 0)
);

create table public.inscricoes (
  id uuid primary key default gen_random_uuid(),
  campeonato_id uuid not null references public.campeonatos(id) on delete cascade,
  competidor_id uuid not null references public.competidores(id) on delete cascade,
  criado_em timestamptz not null default now(),

  constraint inscricao_unica_por_campeonato
    unique (campeonato_id, competidor_id)
);

create table public.historico_campeonatos (
  id uuid primary key default gen_random_uuid(),
  campeonato_id uuid references public.campeonatos(id) on delete set null,

  nome_jogo text not null,
  titulo_campeonato text not null,
  data_evento timestamptz not null,
  local text not null,

  primeiro_nome text not null,
  primeiro_apelido text not null,

  segundo_nome text,
  segundo_apelido text,

  terceiro_nome text,
  terceiro_apelido text,

  criado_em timestamptz not null default now()
);

create table public.noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  subtitulo text,
  texto text not null,
  imagem_url text,
  data_noticia timestamptz not null default now(),
  criado_em timestamptz not null default now()
);

create table public.configuracoes (
  id uuid primary key default gen_random_uuid(),
  nome_site text not null default 'Zero13GameClub',
  logo_url text,
  instagram_url text,
  discord_url text,
  youtube_url text,
  whatsapp_url text,
  atualizado_em timestamptz not null default now()
);

create index idx_campeonatos_data_evento
  on public.campeonatos (data_evento desc);

create index idx_campeonatos_status
  on public.campeonatos (status);

create index idx_campeonatos_tipo
  on public.campeonatos (tipo);

create index idx_inscricoes_competidor
  on public.inscricoes (competidor_id);

create index idx_inscricoes_campeonato
  on public.inscricoes (campeonato_id);

create index idx_historico_data_evento
  on public.historico_campeonatos (data_evento desc);

create index idx_noticias_data_noticia
  on public.noticias (data_noticia desc);