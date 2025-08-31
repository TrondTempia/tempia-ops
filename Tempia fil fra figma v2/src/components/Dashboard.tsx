import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  User,
  Plus,
  Eye
} from 'lucide-react';

interface DashboardProps {
  onLogout?: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('Prosedyre & Instrukser');
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');

  const tabs = ['Prosedyre & Instrukser', 'Prosess-skjema', 'KPI'];
  
  const procedures = [
    { title: 'Brannalarmprosedyre', updatedAt: '2025-08-28', status: 'Aktiv' },
    { title: 'Evakueringsplan', updatedAt: '2025-08-25', status: 'Aktiv' },
    { title: 'Første hjelp protokoll', updatedAt: '2025-08-20', status: 'Under revisjon' },
    { title: 'Kommunikasjonsprosedyre', updatedAt: '2025-08-15', status: 'Aktiv' },
  ];

  const navItems = [
    { id: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'Docs', icon: FileText, label: 'Docs' },
    { id: 'KPI', icon: BarChart3, label: 'KPI' },
    { id: 'Settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="bg-card border-b border-border h-16">
        <div className="flex items-center justify-between h-full max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-8">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <div 
                className="h-8 w-24 bg-primary rounded flex items-center justify-center"
                style={{ borderRadius: 'var(--radius-sm)' }}
              >
                <span className="text-primary-foreground font-bold text-sm">TEMPIA</span>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <nav className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md transition-colors font-medium text-sm ${
                    activeTab === tab
                      ? 'bg-primary text-primary-foreground shadow-card'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] p-6">
          <div className="space-y-6">
            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground text-sm">Admin Bruker</div>
                <div className="text-muted-foreground text-xs">admin@tempia.no</div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNavItem(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium text-sm ${
                      activeNavItem === item.id
                        ? 'bg-primary text-primary-foreground shadow-card'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="pt-4 border-t border-border">
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors font-medium text-sm rounded-md"
              >
                <LogOut className="w-5 h-5" />
                <span>Logg ut</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="space-y-8">
            {/* Procedures Tab */}
            {activeTab === 'Prosedyre & Instrukser' && (
              <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-semibold text-foreground">Prosedyre & Instrukser</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Oversikt over alle prosedyrer og instrukser</p>
                      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-colors flex items-center gap-2 shadow-card">
                        <Plus className="w-4 h-4" />
                        Ny prosedyre
                      </button>
                    </div>
                    
                    <div className="overflow-hidden rounded-md border border-border">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Title</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Updated</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {procedures.map((procedure, index) => (
                            <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-4">
                                <div className="font-medium text-foreground text-sm">
                                  {procedure.title}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="text-muted-foreground text-sm">
                                  {procedure.updatedAt}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <button className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm font-medium hover:opacity-90 transition-colors flex items-center gap-1 shadow-card">
                                  <Eye className="w-3 h-3" />
                                  Vis
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Process Forms Tab */}
            {activeTab === 'Prosess-skjema' && (
              <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
                <div className="px-6 py-4 border-b border-border">
                  <h2 className="font-semibold text-foreground">Prosess-skjema</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Prosessflytdiagram for nødsrespons</p>
                    <div className="bg-muted/30 p-8 border-2 border-dashed border-border min-h-[400px] flex items-center justify-center rounded-md">
                      <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-4">🔄</div>
                        <div className="font-semibold mb-2 text-lg">Mermaid Diagram Placeholder</div>
                        <div className="text-sm">Prosessflytdiagram vil vises her</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KPI Tab */}
            {activeTab === 'KPI' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Responsetid Analyse</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-muted/30 border-2 border-dashed border-border h-64 flex items-center justify-center rounded-md">
                      <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-2">📈</div>
                        <div className="text-sm">Linjediagram Placeholder</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
                  <div className="px-6 py-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Hendelsesstatistikk</h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-muted/30 border-2 border-dashed border-border h-64 flex items-center justify-center rounded-md">
                      <div className="text-center text-muted-foreground">
                        <div className="text-4xl mb-2">📊</div>
                        <div className="text-sm">Stolpediagram Placeholder</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}