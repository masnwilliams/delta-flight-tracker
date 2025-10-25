'use client';

import type { ServicesData } from '@/lib/types';

interface ServicesPanelProps {
  services: ServicesData;
}

export function ServicesPanel({ services }: ServicesPanelProps) {
  const getServiceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'ifc':
      case 'connectivity':
        return '📡';
      case 'iptv':
        return '📺';
      case 'ife-01':
      case 'w-ife':
        return '🎬';
      case 'portal':
        return '🌐';
      case 'satellitenetwork':
        return '🛰️';
      default:
        return '✨';
    }
  };

  const getStatusColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'available':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'disabled':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Available Services</h2>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10">
          <span className="text-3xl">📡</span>
          <div className="flex-1">
            <div className="font-semibold">Connectivity</div>
            <div className="text-xs text-white/60">Internet Access</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            services.connectivity 
              ? 'bg-green-500/20 text-green-300 border-green-500/30' 
              : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>
            {services.connectivity ? 'Connected' : 'Offline'}
          </span>
        </div>

        {services.other.serviceList.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/5 rounded-lg p-4 border border-white/10"
          >
            <span className="text-3xl">{getServiceIcon(service.serviceName)}</span>
            <div className="flex-1">
              <div className="font-semibold">
                {service.serviceName.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-xs text-white/60">
                {service.href ? 'Access available' : 'System service'}
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(service.serviceState)}`}>
              {service.serviceState}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-white/40 text-center">
        Last updated: {new Date(services.other.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
}

