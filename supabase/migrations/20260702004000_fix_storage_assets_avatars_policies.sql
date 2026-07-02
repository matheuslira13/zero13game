-- Policies robustas para avatars no bucket publico assets.
-- O path esperado no Storage e:
-- assets/avatars/{auth.uid()}/arquivo.ext

drop policy if exists "Competidores podem enviar propria foto" on storage.objects;
drop policy if exists "Competidores podem atualizar propria foto" on storage.objects;
drop policy if exists "Competidores podem excluir propria foto" on storage.objects;

create policy "Competidores podem enviar propria foto"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'assets'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Competidores podem atualizar propria foto"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'assets'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'assets'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Competidores podem excluir propria foto"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'assets'
  and (storage.foldername(name))[1] = 'avatars'
  and (storage.foldername(name))[2] = auth.uid()::text
);
