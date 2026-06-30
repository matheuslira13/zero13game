-- Senhas nao ficam em public.competidores. Elas ficam no Supabase Auth.
-- Esta policy libera usuarios autenticados para gerenciar a propria foto
-- em assets/avatars/{auth.uid()}/*.

create policy "Competidores podem enviar propria foto"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'assets'
  and name like ('avatars/' || auth.uid()::text || '/%')
);

create policy "Competidores podem atualizar propria foto"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'assets'
  and name like ('avatars/' || auth.uid()::text || '/%')
)
with check (
  bucket_id = 'assets'
  and name like ('avatars/' || auth.uid()::text || '/%')
);

create policy "Competidores podem excluir propria foto"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'assets'
  and name like ('avatars/' || auth.uid()::text || '/%')
);
