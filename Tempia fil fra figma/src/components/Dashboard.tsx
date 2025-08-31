import React, { useState } from 'react';
import { Button } from './Tempia/Button';
import { Card } from './Tempia/Card';
import { NavItem } from './Tempia/NavItem';
import { TableRow } from './Tempia/TableRow';
import { ChartPlaceholder } from './Tempia/ChartPlaceholder';
import tempiaLogo from 'figma:asset/6eccd9abc8037b7532df8cba945c4a778aa40634.png';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';

interface DashboardProps {
  onLogout?: () => void;
}

// Frame: Dashboard (1440×1024)
export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Prosedyre & Instrukser');
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');

  const tabs = ['Prosedyre & Instrukser', 'Prosess-skjema', 'KPI'];
  
  const procedures = [
    { title: 'Brannalarmprosedyre', updatedAt: '2025-08-28', status: 'Aktiv' },
    { title: 'Evakueringsplan', updatedAt: '2025-08-25', status: 'Aktiv' },
    { title: 'Første hjelp protokoll', updatedAt: '2025-08-20', status: 'Under revisjon' },
    { title: 'Kommunikasjonsprosedyre', updatedAt: '2025-08-15', status: 'Aktiv' },
  ];

  return (
    // Frame: Dashboard
    <div 
      className="w-[1440px] h-[1024px] mx-auto overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-page)' }}
    >
      {/* Header/Navigation */}
      <header 
        className="h-16"
        style={{ 
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: `1px solid var(--color-border-default)`
        }}
      >
        <div className="flex items-center justify-between h-full mx-[120px]">
          <div className="flex items-center gap-8">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <img 
                src={tempiaLogo} 
                alt="Tempia Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            {/* Tab/Navigation */}
            <nav className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 transition-colors font-medium`}
                  style={{ 
                    borderRadius: 'var(--radius-component-md)',
                    fontSize: 'var(--text-body-size)',
                    lineHeight: 'var(--text-body-line-height)',
                    backgroundColor: activeTab === tab ? 'var(--color-brand-primary)' : 'transparent',
                    color: activeTab === tab ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)',
                    boxShadow: activeTab === tab ? 'var(--shadow-card)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab) {
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(1024px-64px)]">
        {/* Grid Container with 120px margins */}
        <div className="flex w-full mx-[120px]">
          {/* Sidebar - 3 columns of 12-column grid */}
          <aside 
            className="w-[240px] p-6 flex-shrink-0"
            style={{ 
              backgroundColor: 'var(--color-bg-surface)',
              borderRight: `1px solid var(--color-border-default)`
            }}
          >
            <div className="space-y-6">
              {/* User/Avatar */}
              <div 
                className="flex items-center gap-3 p-3" 
                style={{ 
                  borderRadius: 'var(--radius-component-md)',
                  backgroundColor: 'var(--color-bg-subtle)'
                }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center" 
                  style={{ 
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-brand-primary)'
                  }}
                >
                  <User className="w-5 h-5" style={{ color: 'var(--color-text-on-primary)' }} />
                </div>
                <div>
                  <div 
                    className="font-medium" 
                    style={{ 
                      fontSize: 'var(--text-small-size)', 
                      lineHeight: 'var(--text-small-line-height)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    Admin Bruker
                  </div>
                  <div 
                    style={{ 
                      fontSize: 'var(--text-caption-size)', 
                      lineHeight: 'var(--text-caption-line-height)',
                      color: 'var(--color-text-secondary)'
                    }}
                  >
                    admin@tempia.no
                  </div>
                </div>
              </div>

              {/* Nav/Items */}
              <nav className="space-y-2">
                <NavItem 
                  icon={<LayoutDashboard />}
                  active={activeNavItem === 'Dashboard'}
                  onClick={() => setActiveNavItem('Dashboard')}
                >
                  Dashboard
                </NavItem>
                <NavItem 
                  icon={<FileText />}
                  active={activeNavItem === 'Docs'}
                  onClick={() => setActiveNavItem('Docs')}
                >
                  Docs
                </NavItem>
                <NavItem 
                  icon={<BarChart3 />}
                  active={activeNavItem === 'KPI'}
                  onClick={() => setActiveNavItem('KPI')}
                >
                  KPI
                </NavItem>
                <NavItem 
                  icon={<Settings />}
                  active={activeNavItem === 'Settings'}
                  onClick={() => setActiveNavItem('Settings')}
                >
                  Settings
                </NavItem>
              </nav>

              {/* Button/Logout */}
              <div 
                className="pt-4" 
                style={{ borderTop: `1px solid var(--color-border-default)` }}
              >
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 transition-colors font-medium"
                  style={{ 
                    borderRadius: 'var(--radius-component-md)',
                    fontSize: 'var(--text-body-size)',
                    lineHeight: 'var(--text-body-line-height)',
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-state-error)';
                    e.currentTarget.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logg ut</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content - 9 columns with 24px gutter */}
          <main className="flex-1 p-8 ml-6">
            <div className="space-y-8">
              {/* Card/Procedures - Prosedyre & Instrukser */}
              {activeTab === 'Prosedyre & Instrukser' && (
                <Card title="Prosedyre & Instrukser">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>Oversikt over alle prosedyrer og instrukser</p>
                      <Button>+ Ny prosedyre</Button>
                    </div>
                    
                    <div className="overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 pr-4 font-medium text-muted-foreground" style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>Title</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground" style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>Updated</th>
                            <th className="text-left py-3 pl-4 font-medium text-muted-foreground" style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {procedures.map((procedure, index) => (
                            <TableRow 
                              key={index}
                              title={procedure.title}
                              updatedAt={procedure.updatedAt}
                              onView={() => console.log('View', procedure.title)}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              )}

              {/* Card/Process - Prosess-skjema */}
              {activeTab === 'Prosess-skjema' && (
                <Card title="Prosess-skjema">
                  <div className="space-y-4">
                    <p className="text-muted-foreground" style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' }}>Prosessflytdiagram for nødsrespons</p>
                    {/* Placeholder/Mermaid */}
                    <div className="bg-neutral-50 p-8 border-2 border-dashed border-neutral-200 min-h-[400px] flex items-center justify-center" style={{ borderRadius: 'var(--radius-md)' }}>
                      <div className="text-center text-neutral-500">
                        <div className="text-4xl mb-4">🔄</div>
                        <div className="font-semibold mb-2" style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--leading-h3)' }}>Mermaid Diagram Placeholder</div>
                        <div style={{ fontSize: 'var(--text-small)', lineHeight: 'var(--leading-small)' }}>Prosessflytdiagram vil vises her</div>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Card/KPI Grid - KPI Charts */}
              {activeTab === 'KPI' && (
                <div className="grid grid-cols-2 gap-6">
                  <Card title="Responsetid Analyse">
                    <ChartPlaceholder type="line" title="Gjennomsnittlig responsetid" height={250} />
                  </Card>
                  
                  <Card title="Hendelsesstatistikk">
                    <ChartPlaceholder type="bar" title="Hendelser per måned" height={250} />
                  </Card>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}