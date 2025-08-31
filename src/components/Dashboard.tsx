// src/components/Dashboard.tsx
import { useState } from 'react';
import { Card } from './Tempia/Card';
import { Button } from './Tempia/Button';
import { Badge } from './Tempia/Badge';
import { NavItem } from './Tempia/NavItem';
import { ChartPlaceholder } from './Tempia/ChartPlaceholder';
import tempiaLogo from '../assets/tempia-logo.png';
import {
  Home,
  Settings,
  User,
  FileText,
  AlertTriangle,
  Activity,
  Users,
  MapPin,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-card sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted"
              style={{ borderRadius: 'var(--radius-component-sm)' }}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Replaces Next <Image /> */}
            <img src={tempiaLogo} alt="Tempia" className="h-8 w-auto object-contain" />

            <div className="hidden sm:block">
              <h1 style={{ fontSize: 'var(--text-h3)', fontWeight: 'var(--font-weight-semibold)' }}>
                Operations Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="tertiary" className="p-2">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="tertiary" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Logg ut</span>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-border px-6">
          <nav className="flex space-x-8">
            <a href="#" className="border-b-2 border-primary py-4 px-1 text-primary font-medium">
              Dashboard
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 px-1 text-muted-foreground hover:text-foreground"
            >
              Hendelser
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 px-1 text-muted-foreground hover:text-foreground"
            >
              Ressurser
            </a>
            <a
              href="#"
              className="border-b-2 border-transparent py-4 px-1 text-muted-foreground hover:text-foreground"
            >
              Rapporter
            </a>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            <div className="p-6">
              <div
                style={{
                  fontSize: 'var(--text-h3)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-text-primary)',
                }}
              >
                Navigasjon
              </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
              <NavItem icon={<Home />} active>
                Oversikt
              </NavItem>
              <NavItem icon={<AlertTriangle />}>Aktive hendelser</NavItem>
              <NavItem icon={<Activity />}>Overvåkning</NavItem>
              <NavItem icon={<Users />}>Personell</NavItem>
              <NavItem icon={<MapPin />}>Kart</NavItem>
              <NavItem icon={<FileText />}>Dokumenter</NavItem>
              <NavItem icon={<Settings />}>Innstillinger</NavItem>
            </nav>

            <div className="p-4 border-t border-border">
              <NavItem icon={<User />}>Profil</NavItem>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 max-w-7xl mx-auto">
            {/* Procedures Column */}
            <div className="lg:col-span-3 space-y-6">
              <Card title="Aktive Prosedyrer">
                <div className="space-y-4">
                  <div
                    className="p-4 bg-muted border border-border"
                    style={{ borderRadius: 'var(--radius-component-md)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Brannalarm - Bygning A
                      </div>
                      <Badge variant="warning" style="solid">
                        Aktiv
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3" style={{ fontSize: 'var(--text-small)' }}>
                      Evakuering pågår. Brannvesen varslet.
                    </p>
                    <Button variant="primary" size="sm" className="w-full">
                      Se detaljer
                    </Button>
                  </div>

                  <div
                    className="p-4 bg-muted border border-border"
                    style={{ borderRadius: 'var(--radius-component-md)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-semibold)' }}>
                        Medisinsk nødsituasjon
                      </div>
                      <Badge variant="error" style="solid">
                        Kritisk
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3" style={{ fontSize: 'var(--text-small)' }}>
                      Ambulanse på vei. ETA 4 minutter.
                    </p>
                    <Button variant="primary" size="sm" className="w-full">
                      Se detaljer
                    </Button>
                  </div>
                </div>
              </Card>

              <Card title="Hurtighandlinger">
                <div className="space-y-3">
                  <Button variant="secondary" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Ny hendelse
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Kall personell
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Opprett rapport
                  </Button>
                </div>
              </Card>
            </div>

            {/* Diagram Column */}
            <div className="lg:col-span-6 space-y-6">
              <Card title="Systemstatus Oversikt">
                <div className="h-96">
                  <div
                    className="w-full h-full bg-muted border-2 border-dashed border-border flex items-center justify-center"
                    style={{ borderRadius: 'var(--radius-component-lg)' }}
                  >
                    <div className="text-center text-muted-foreground">
                      <div className="mb-2">
                        <Activity className="w-8 h-8 mx-auto" />
                      </div>
                      <div style={{ fontSize: 'var(--text-body)', fontWeight: 'var(--font-weight-medium)' }}>
                        Mermaid Diagram Placeholder
                      </div>
                      <div style={{ fontSize: 'var(--text-small)' }}>Her vil systemstatus-diagram vises</div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 'var(--text-h1)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-brand-primary)',
                      }}
                    >
                      12
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-small)' }}>
                      Aktive hendelser
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 'var(--text-h1)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-state-success)',
                      }}
                    >
                      89
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-small)' }}>
                      Tilgjengelig personell
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <div
                      style={{
                        fontSize: 'var(--text-h1)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--color-state-warning)',
                      }}
                    >
                      3
                    </div>
                    <div className="text-muted-foreground" style={{ fontSize: 'var(--text-small)' }}>
                      Varsler aktive
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* KPI Charts Column */}
            <div className="lg:col-span-3 space-y-6">
              <Card title="Nøkkelindikatorer">
                <div className="space-y-6">
                  <ChartPlaceholder type="line" title="Responsetid" height={120} />
                  <ChartPlaceholder type="bar" title="Hendelsestyper" height={120} />
                  <ChartPlaceholder type="pie" title="Ressursbruk" height={120} />
                </div>
              </Card>

              <Card title="Systemstatus">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 'var(--text-small)' }}>Kommunikasjon</span>
                    <Badge variant="success" style="subtle">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 'var(--text-small)' }}>GPS Tracking</span>
                    <Badge variant="success" style="subtle">
                      Aktiv
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 'var(--text-small)' }}>Backup Systemer</span>
                    <Badge variant="warning" style="subtle">
                      Standby
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 'var(--text-small)' }}>Ekstern API</span>
                    <Badge variant="error" style="subtle">
                      Offline
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
