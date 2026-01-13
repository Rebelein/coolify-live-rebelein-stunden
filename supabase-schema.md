# Supabase Schema Änderungen

## 2026-01-13: Bestätigungspflicht Toggle

Hinzufügen einer Spalte `require_confirmation` zur Tabelle `user_settings`, um steuern zu können, ob Zeitbuchungen eines Benutzers eine Bestätigung durch das Büro erfordern.

```sql
ALTER TABLE user_settings ADD COLUMN require_confirmation BOOLEAN DEFAULT TRUE;
```

## 2026-01-13: Notdienst & Zuschläge

Hinzufügen einer Spalte `surcharge` zur Tabelle `time_entries` (Integer, erlaubt NULL oder 0) für Zuschläge (25, 50, 100) bei Notdienst-Einträgen.

```sql
ALTER TABLE time_entries ADD COLUMN surcharge INTEGER DEFAULT 0;
```
