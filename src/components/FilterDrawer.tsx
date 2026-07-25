import React from 'react';
import { Language, SearchFilters, Religion, Region, RelationshipIntent } from '../types';
import { getTranslation } from '../lib/translations';
import { X, SlidersHorizontal, ShieldCheck, Info } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  filters: SearchFilters;
  onApplyFilters: (newFilters: SearchFilters) => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  language,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<SearchFilters>(filters);

  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-stone-900 border-l border-amber-900/40 h-full flex flex-col text-stone-100 shadow-2xl">
        
        {/* Drawer Header */}
        <div className="p-5 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-amharic text-amber-100">
              {getTranslation(language, 'filterTitle')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-750 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Age Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-300 font-amharic">
                {getTranslation(language, 'filterAge')}
              </label>
              <span className="text-xs font-mono font-bold text-amber-400">
                {localFilters.minAge} - {localFilters.maxAge} years
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-stone-400">Min Age: {localFilters.minAge}</span>
                <input
                  type="range"
                  min={18}
                  max={60}
                  value={localFilters.minAge}
                  onChange={(e) => setLocalFilters({ ...localFilters, minAge: Number(e.target.value) })}
                  className="w-full accent-amber-500 bg-stone-800"
                />
              </div>
              <div>
                <span className="text-[10px] text-stone-400">Max Age: {localFilters.maxAge}</span>
                <input
                  type="range"
                  min={18}
                  max={70}
                  value={localFilters.maxAge}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxAge: Number(e.target.value) })}
                  className="w-full accent-amber-500 bg-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Relationship Intent */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 font-amharic">
              {getTranslation(language, 'filterIntent')}
            </label>
            <select
              value={localFilters.intent || 'all'}
              onChange={(e) => setLocalFilters({ ...localFilters, intent: e.target.value as RelationshipIntent | 'all' })}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
            >
              <option value="all">{getTranslation(language, 'allIntents')}</option>
              <option value="marriage">{getTranslation(language, 'intentMarriage')}</option>
              <option value="serious">{getTranslation(language, 'intentSerious')}</option>
              <option value="casual">{getTranslation(language, 'intentCasual')}</option>
            </select>
          </div>

          {/* Religion */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 font-amharic">
              {getTranslation(language, 'filterReligion')}
            </label>
            <select
              value={localFilters.religion || 'all'}
              onChange={(e) => setLocalFilters({ ...localFilters, religion: e.target.value as Religion | 'all' })}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
            >
              <option value="all">{getTranslation(language, 'allReligions')}</option>
              <option value="orthodox">{getTranslation(language, 'religionOrthodox')}</option>
              <option value="islam">{getTranslation(language, 'religionIslam')}</option>
              <option value="protestant">{getTranslation(language, 'religionProtestant')}</option>
              <option value="catholic">{getTranslation(language, 'religionCatholic')}</option>
              <option value="traditional">{getTranslation(language, 'religionTraditional')}</option>
              <option value="other">{getTranslation(language, 'religionOther')}</option>
            </select>
          </div>

          {/* Region / Ethnicity Filter (Self-disclosed field) */}
          <div className="p-4 bg-amber-950/20 border border-amber-800/40 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold">
              <Info className="w-4 h-4 shrink-0 text-amber-400" />
              <span className="font-amharic">{getTranslation(language, 'filterRegion')}</span>
            </div>
            <p className="text-[10px] text-stone-400 leading-relaxed font-amharic">
              {getTranslation(language, 'regionDisclaimer')}
            </p>

            <select
              value={localFilters.region || 'all'}
              onChange={(e) => setLocalFilters({ ...localFilters, region: e.target.value as Region | 'all' })}
              className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 focus:border-amber-500 rounded-xl text-stone-100 text-xs font-amharic outline-none"
            >
              <option value="all">{getTranslation(language, 'allRegions')}</option>
              <option value="amhara">{getTranslation(language, 'regionAmhara')}</option>
              <option value="oromo">{getTranslation(language, 'regionOromo')}</option>
              <option value="tigray">{getTranslation(language, 'regionTigray')}</option>
              <option value="gurage">{getTranslation(language, 'regionGurage')}</option>
              <option value="sidama">{getTranslation(language, 'regionSidama')}</option>
              <option value="somali">{getTranslation(language, 'regionSomali')}</option>
              <option value="afar">{getTranslation(language, 'regionAfar')}</option>
              <option value="snnpr">{getTranslation(language, 'regionSNNPR')}</option>
              <option value="diaspora_usa">{getTranslation(language, 'regionDiasporaUSA')}</option>
              <option value="diaspora_europe">{getTranslation(language, 'regionDiasporaEurope')}</option>
              <option value="diaspora_middle_east">{getTranslation(language, 'regionDiasporaMiddleEast')}</option>
            </select>
          </div>

          {/* Verified Only Checkbox */}
          <div className="p-3 bg-stone-800/80 border border-stone-700 rounded-2xl">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold font-amharic text-stone-200">
                  {getTranslation(language, 'filterVerifiedOnly')}
                </span>
              </div>
              <input
                type="checkbox"
                checked={localFilters.verifiedOnly}
                onChange={(e) => setLocalFilters({ ...localFilters, verifiedOnly: e.target.checked })}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-stone-900 border-stone-600"
              />
            </label>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 bg-stone-900 border-t border-stone-800 flex items-center space-x-3">
          <button
            type="button"
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="flex-1 py-3 px-4 bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs rounded-2xl transition font-amharic text-center"
          >
            {getTranslation(language, 'resetFilters')}
          </button>
          
          <button
            type="button"
            onClick={() => {
              onApplyFilters(localFilters);
              onClose();
            }}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs rounded-2xl shadow-lg transition font-amharic text-center"
          >
            {getTranslation(language, 'applyFilters')}
          </button>
        </div>

      </div>
    </div>
  );
};
