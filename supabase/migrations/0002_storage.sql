-- Create fdv bucket for PDF storage
insert into storage.buckets (id, name, public)
values ('fdv', 'fdv', false)
on conflict (id) do nothing;

-- Storage policies for fdv bucket
create policy if not exists "fdv_select_authenticated"
on storage.objects for select to authenticated
using (bucket_id = 'fdv');

create policy if not exists "fdv_insert_admin_only"
on storage.objects for insert to authenticated
with check (bucket_id = 'fdv' and public.jwt_role() <> 'viewer');

create policy if not exists "fdv_update_admin_only"
on storage.objects for update to authenticated
using (bucket_id = 'fdv' and public.jwt_role() <> 'viewer')
with check (bucket_id = 'fdv' and public.jwt_role() <> 'viewer');

create policy if not exists "fdv_delete_admin_only"
on storage.objects for delete to authenticated
using (bucket_id = 'fdv' and public.jwt_role() <> 'viewer');