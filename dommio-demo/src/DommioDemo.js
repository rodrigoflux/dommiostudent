import React, { useState, useRef, useEffect } from 'react';

// SVGs for playful icons and hero illustration
const HeroSVG = () => (
  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="110" rx="70" ry="10" fill="#E9EAFB"/>
    <rect x="60" y="40" width="60" height="40" rx="20" fill="#B4B8F8"/>
    <circle cx="90" cy="60" r="20" fill="#F7D6E0"/>
    <ellipse cx="90" cy="60" rx="8" ry="8" fill="#fff"/>
    <rect x="80" y="80" width="20" height="8" rx="4" fill="#FFD6A5"/>
  </svg>
);
const BrandIcon = ({ color = '#B4B8F8', label = 'B' }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="12" fill="#E9EAFB"/>
    <circle cx="20" cy="20" r="10" fill={color}/>
    <text x="20" y="25" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">{label}</text>
  </svg>
);
const GiftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="12" width="20" height="10" rx="3" fill="#FFD6A5"/>
    <rect x="7" y="7" width="14" height="7" rx="3.5" fill="#B4B8F8"/>
    <rect x="13" y="7" width="2" height="15" rx="1" fill="#fff"/>
  </svg>
);
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="10" r="6" fill="#B4B8F8"/>
    <rect x="5" y="18" width="18" height="6" rx="3" fill="#E9EAFB"/>
  </svg>
);
const HomeIcon = ({active}) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="16" height="10" rx="3" fill={active ? '#B4B8F8' : '#E9EAFB'}/>
    <polygon points="14,6 24,14 4,14" fill={active ? '#FFD6A5' : '#F7D6E0'}/>
  </svg>
);
const StarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="14,4 17,12 26,12 18.5,17 21,25 14,20 7,25 9.5,17 2,12 11,12" fill="#FFD6A5"/>
  </svg>
);
const CategoryIcon = ({active}) => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="20" height="8" rx="3" fill={active ? '#FFD6A5' : '#E9EAFB'}/>
    <rect x="8" y="16" width="12" height="4" rx="2" fill={active ? '#B4B8F8' : '#F7D6E0'}/>
  </svg>
);
const HeartIcon = ({ filled = false, size = 24, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21s-6.2-5.1-8.2-7.2C2 12.2 2 9.2 4.1 7.4 5.7 6 8.1 6.2 9.5 7.7L12 10.3l2.5-2.6c1.4-1.5 3.8-1.7 5.4-0.3C22 9.2 22 12.2 20.2 13.8 18.2 15.9 12 21 12 21z" stroke="#7B6EF6" strokeWidth="1.5" fill={filled ? '#FFD6A5' : 'none'} />
  </svg>
);

const BRANDS = [
  {
    id: 1,
    name: 'TiendaUno',
    offer: '15% de descuento en tu primera compra',
    description: 'Ahorra en tu primer pedido. Solo para estudiantes.',
    code: 'ESTUDIA15',
    expires: '31/12/2024',
    color: '#B4B8F8',
    label: 'T1',
    conditions: [
      'Solo para nuevos usuarios',
      'No acumulable con otras promociones',
      'Verificación estudiantil requerida'
    ]
  },
  {
    id: 2,
    name: 'ComidaExpress',
    offer: '2x1 en combos seleccionados',
    description: 'Disfruta más por menos en tus restaurantes favoritos.',
    code: 'COMBO2X1',
    expires: '15/08/2024',
    color: '#FFD6A5',
    label: 'CE',
    conditions: [
      'Válido solo en combos participantes',
      'Presenta tu credencial de estudiante',
      'No aplica en delivery'
    ]
  },
  {
    id: 3,
    name: 'LibrosYA',
    offer: '10% en libros y papelería',
    description: 'Equípate para el semestre con descuento especial.',
    code: 'LIBRO10',
    expires: '30/09/2024',
    color: '#1EE0B7',
    label: 'LY',
    conditions: [
      'Descuento máximo $200',
      'Solo para estudiantes activos',
      'No válido en libros importados'
    ]
  },
  {
    id: 4,
    name: 'ModaCool',
    offer: '20% en ropa y accesorios',
    description: 'Renueva tu look con precios especiales.',
    code: 'MODACOOL20',
    expires: '10/10/2024',
    color: '#F7D6E0',
    label: 'MC',
    conditions: [
      'Solo en artículos seleccionados',
      'Un uso por estudiante',
      'No acumulable'
    ]
  },
  {
    id: 5,
    name: 'TechZone',
    offer: 'Hasta 18% en tecnología',
    description: 'Descuentos en laptops, audífonos y más.',
    code: 'TECH18',
    expires: '31/12/2024',
    color: '#B4B8F8',
    label: 'TZ',
    conditions: [
      'Aplican restricciones',
      'Verifica tu correo .edu.mx',
      'No válido en Apple'
    ]
  },
  {
    id: 6,
    name: 'ViajaFácil',
    offer: '12% en boletos de autobús',
    description: 'Viaja por México con descuento exclusivo.',
    code: 'VIAJA12',
    expires: '01/12/2024',
    color: '#FFD6A5',
    label: 'VF',
    conditions: [
      'Solo para estudiantes',
      'Compra mínima $300',
      'No aplica en temporada alta'
    ]
  }
];

const STEPS = [
  {
    title: '¡Bienvenido a Dommio!',
    description: 'Descubre ofertas exclusivas para estudiantes. Toca "Comenzar" para iniciar.',
    highlight: null
  },
  {
    title: 'Verificación Estudiantil',
    description: 'Regístrate con tu correo .edu.mx para acceder a los descuentos.',
    highlight: 'verify-form'
  },
  {
    title: 'Explora Ofertas',
    description: 'Toca la oferta resaltada para ver los detalles.',
    highlight: 'offer-card-0'
  },
  {
    title: 'Detalles de la Oferta',
    description: 'Toca "Copiar Código" para usar tu descuento.',
    highlight: 'copy-code-btn'
  },
  {
    title: '¡Listo!',
    description: 'Has completado la demo. Toca "Reiniciar" para probar de nuevo.',
    highlight: null
  }
];

const ACCENT = '#7B6EF6';
const CTA = '#FFD6A5';
const BG = 'linear-gradient(180deg, #F7F8FC 0%, #F1F3FA 100%)';
const CARD = '#fff';
const BORDER = '#E5E7EB';
const TEXT = '#232946';
const SUBTLE = '#6B7280';
const RADIUS = 28;

function useLockdown(refs, currentStep) {
  useEffect(() => {
    Object.entries(refs).forEach(([key, ref]) => {
      if (!ref.current) return;
      if (STEPS[currentStep].highlight === key) {
        ref.current.style.pointerEvents = 'auto';
        ref.current.style.filter = 'none';
        ref.current.style.opacity = '1';
      } else {
        ref.current.style.pointerEvents = 'none';
        ref.current.style.filter = 'blur(2px) grayscale(0.2)';
        ref.current.style.opacity = '0.5';
      }
    });
  }, [refs, currentStep]);
}

export default function DommioDemo() {
  const [step, setStep] = useState(0);
  const [verified, setVerified] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ nombre: 'Juan Pérez', email: 'juan.perez@universidad.edu.mx' });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [vendorPage, setVendorPage] = useState(false);
  const [vendorThankYou, setVendorThankYou] = useState(false);
  const [vendorPayment, setVendorPayment] = useState(false);

  // Refs for lockdown
  const verifyFormRef = useRef();
  const offerCardRefs = Array.from({ length: BRANDS.length }, () => useRef());
  const copyCodeBtnRef = useRef();
  const refs = {
    'verify-form': verifyFormRef,
    'offer-card-0': offerCardRefs[0],
    'copy-code-btn': copyCodeBtnRef
  };
  useLockdown(refs, step);

  function restart() {
    setStep(0);
    setVerified(false);
    setShowDetails(false);
    setCopied(false);
    setForm({ nombre: 'Juan Pérez', email: 'juan.perez@universidad.edu.mx' });
    setFormError('');
    setFormLoading(false);
    setSelectedOffer(0);
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError('');
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setFormError('');
    if (!form.nombre.trim()) {
      setFormError('Por favor ingresa tu nombre.');
      return;
    }
    if (!/^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9-]+\.)+edu\.mx$/.test(form.email.trim())) {
      setFormError('Ingresa un correo válido que termine en .edu.mx');
      return;
    }
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setVerified(true);
      setStep(2);
    }, 1200);
  }

  function toggleFavorite(id) {
    setFavorites(favs => favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id]);
  }

  // App frame
  return (
    <div style={{
      minHeight: '100vh',
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: TEXT,
      padding: 0,
    }}>
      {/* Simulated phone frame */}
      <div style={{
        width: '100%',
        maxWidth: 420,
        minHeight: 700,
        background: CARD,
        borderRadius: RADIUS,
        boxShadow: '0 8px 40px 0 rgba(123,110,246,0.10)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        border: `1.5px solid ${BORDER}`,
      }}>
        {/* Header bar */}
        <div style={{height: 64, background: 'linear-gradient(90deg, #B4B8F8 0%, #FFD6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 1px 0 0 #F1F1F1'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            <GiftIcon />
            <span style={{fontWeight: 800, fontSize: 22, letterSpacing: -1, color: TEXT}}>Dommio</span>
          </div>
          <UserIcon />
        </div>
        {/* Hero illustration and greeting */}
        {step === 0 && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0 0 0'}}>
            <HeroSVG />
            <div style={{fontWeight: 800, fontSize: 26, margin: '24px 0 8px 0', color: TEXT}}>¡Bienvenido!</div>
            <div style={{fontSize: 17, color: SUBTLE, textAlign: 'center', maxWidth: 260, marginBottom: 8}}>Descubre ofertas exclusivas para estudiantes y ahorra en tus marcas favoritas.</div>
            <div style={{display: 'flex', justifyContent: 'center', margin: '32px 0 0 0'}}>
              <button
                style={{
                  minWidth: 180,
                  padding: '18px 32px',
                  background: ACCENT,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 22,
                  fontWeight: 800,
                  fontSize: 19,
                  boxShadow: '0 2px 8px rgba(123,110,246,0.10)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  letterSpacing: 0.2,
                }}
                onClick={() => setStep(1)}
              >
                Comenzar
              </button>
            </div>
          </div>
        )}
        {/* Stepper */}
        <div style={{display: 'flex', justifyContent: 'center', gap: 8, margin: '18px 0 0 0'}}>
          {STEPS.map((s, i) => (
            <div key={i} style={{width: 10, height: 10, borderRadius: 5, background: i === step ? ACCENT : BORDER, opacity: i <= step ? 1 : 0.3, transition: 'background 0.2s'}} />
          ))}
        </div>
        {/* Main content */}
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', padding: '0 0 90px 0'}}>
          <div style={{padding: '28px 24px 0 24px'}}>
            <div style={{fontWeight: 700, fontSize: 22, marginBottom: 6, letterSpacing: -0.5}}>{STEPS[step].title}</div>
            <div style={{color: SUBTLE, fontSize: 16, marginBottom: 18, lineHeight: 1.5}}>{STEPS[step].description}</div>

            {/* Paso 1: Formulario de verificación */}
            {step === 1 && (
              <form
                ref={verifyFormRef}
                style={{
                  background: '#F7F8FC',
                  borderRadius: 18,
                  boxShadow: '0 2px 8px rgba(123,110,246,0.06)',
                  padding: 24,
                  margin: '32px 0 0 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  border: `1.5px solid ${BORDER}`,
                  maxWidth: 340,
                  width: '100%',
                }}
                onSubmit={handleFormSubmit}
                autoComplete="off"
              >
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={handleFormChange}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: `1.5px solid ${BORDER}`,
                    fontSize: 16,
                    fontWeight: 500,
                    outline: 'none',
                  }}
                  disabled={formLoading}
                  autoFocus
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo institucional (.edu.mx)"
                  value={form.email}
                  onChange={handleFormChange}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 12,
                    border: `1.5px solid ${BORDER}`,
                    fontSize: 16,
                    fontWeight: 500,
                    outline: 'none',
                  }}
                  disabled={formLoading}
                />
                <div style={{fontSize: 13, color: SUBTLE, marginTop: -8, marginBottom: 0}}>Usa tu correo universitario que termine en <b>.edu.mx</b></div>
                {formError && <div style={{color: '#FF6B6B', fontWeight: 700, fontSize: 15, marginTop: 2}}>{formError}</div>}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: ACCENT,
                    color: '#fff',
                    border: 'none',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: 18,
                    marginTop: 8,
                    cursor: formLoading ? 'not-allowed' : 'pointer',
                    opacity: formLoading ? 0.7 : 1,
                    transition: 'background 0.2s',
                  }}
                  disabled={formLoading}
                >
                  {formLoading ? 'Verificando...' : 'Verificar'}
                </button>
              </form>
            )}

            {/* Paso 2: Deal of the Day, Slider y grid de ofertas estilo UNiDAYS */}
            {step === 2 && (
              <div>
                {/* Deal of the Day */}
                <div style={{
                  background: '#fff',
                  borderRadius: 22,
                  boxShadow: '0 2px 16px 0 rgba(44,62,80,0.08)',
                  padding: '28px 18px 24px 18px',
                  margin: '0 0 18px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  minHeight: 260,
                }}>
                  <div style={{fontWeight: 900, fontSize: 15, letterSpacing: 1, color: '#7B6EF6', marginBottom: 6}}>OFERTA DEL DÍA</div>
                  {/* Placeholder product image */}
                  <div style={{width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(120deg, #B4B8F8 0%, #FFD6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: '0 4px 16px 0 rgba(44,62,80,0.10)'}}>
                    {/* SVG Headphones as placeholder */}
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="35" cy="60" rx="28" ry="7" fill="#E9EAFB"/>
                      <rect x="18" y="30" width="34" height="18" rx="9" fill="#232946"/>
                      <rect x="12" y="38" width="10" height="18" rx="5" fill="#B4B8F8"/>
                      <rect x="48" y="38" width="10" height="18" rx="5" fill="#FFD6A5"/>
                    </svg>
                  </div>
                  <div style={{fontWeight: 800, fontSize: 19, color: TEXT, marginBottom: 2}}>Audífonos ProSound</div>
                  <div style={{fontWeight: 700, fontSize: 15, color: SUBTLE, marginBottom: 8}}>¡Solo hoy! Hasta 40% de descuento</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6}}>
                    <div style={{background: '#232946', color: '#fff', fontWeight: 800, fontSize: 18, borderRadius: 12, padding: '6px 18px', boxShadow: '0 2px 8px rgba(44,62,80,0.10)'}}>Obtén por $899</div>
                    <div style={{fontSize: 13, color: '#7B6EF6', fontWeight: 700, background: '#E9EAFB', borderRadius: 8, padding: '2px 8px'}}>Antes $1,499</div>
                  </div>
                  <div style={{fontSize: 13, color: SUBTLE, marginTop: 2}}>Limitado a 1 por estudiante</div>
                </div>
                {/* Slider: Explora lo Mejor */}
                <div style={{margin: '18px 0 10px 0', position: 'relative'}}>
                  {/* Animated arrow and label above the first card, absolutely positioned */}
                  <div style={{
                    position: 'absolute',
                    left: 0, // aligns with first card
                    top: -54, // above the cards, below the heading
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 140, // match card width
                    pointerEvents: 'none',
                    zIndex: 10
                  }}>
                    <span style={{fontWeight: 700, fontSize: 15, color: ACCENT, marginBottom: 2, lineHeight: 1}}></span>
                    <svg width="32" height="32" viewBox="0 0 32 32" style={{animation: 'bounce 1s infinite'}} fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4v20M16 24l-7-7M16 24l7-7" stroke="#7B6EF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <style>{`@keyframes bounce {0%,100%{transform:translateY(0);}50%{transform:translateY(8px);}}`}</style>
                  </div>
                  <div style={{fontWeight: 800, fontSize: 18, marginBottom: 8, color: TEXT}}>Explora lo Mejor</div>
                  <div style={{position: 'relative'}}>
                    <div style={{
                      display: 'flex',
                      overflowX: 'auto',
                      gap: 18,
                      paddingBottom: 8,
                      WebkitOverflowScrolling: 'touch',
                    }}>
                      {BRANDS.slice(0, 3).map((brand, i) => (
                        <div
                          key={brand.id}
                          ref={offerCardRefs[i]}
                          style={{
                            minWidth: 140,
                            minHeight: 140,
                            width: 140,
                            height: 140,
                            background: 'linear-gradient(120deg, #B4B8F8 0%, #FFD6A5 100%)',
                            borderRadius: 18,
                            boxShadow: '0 2px 8px 0 rgba(123,110,246,0.10)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: i === 0 ? 'pointer' : 'default',
                            border: `1.5px solid ${BORDER}`,
                            opacity: i === 0 ? 1 : 0.7,
                            filter: i === 0 ? 'none' : 'grayscale(0.1) blur(1px)',
                            pointerEvents: i === 0 ? 'auto' : 'none',
                            position: 'relative',
                            transition: 'box-shadow 0.2s',
                          }}
                          onClick={() => {
                            if (i === 0) {
                              setSelectedOffer(i);
                              setShowDetails(true);
                              setStep(3);
                            }
                          }}
                        >
                          {/* Heart icon */}
                          <div
                            style={{position: 'absolute', top: 8, left: 8, zIndex: 2, cursor: 'pointer', opacity: 0.7, background: 'rgba(255,255,255,0.6)', borderRadius: '50%', padding: 2}}
                            onClick={e => { e.stopPropagation(); toggleFavorite(brand.id); }}
                          >
                            <HeartIcon filled={favorites.includes(brand.id)} size={22} />
                          </div>
                          <div style={{marginBottom: 8}}><BrandIcon color={brand.color} label={brand.label} /></div>
                          <div style={{fontWeight: 800, fontSize: 15, color: TEXT, textAlign: 'center'}}>{brand.name}</div>
                          <div style={{fontSize: 13, color: TEXT, fontWeight: 500, textAlign: 'center', marginBottom: 2}}>{brand.offer}</div>
                          {/* Playful accent */}
                          {i === 0 && <div style={{position: 'absolute', top: 10, right: 10, background: '#FFD6A5', color: '#7B6EF6', fontWeight: 700, fontSize: 11, borderRadius: 8, padding: '2px 8px'}}>¡Popular!</div>}
                          {i === 1 && <div style={{position: 'absolute', top: 10, right: 10, background: '#B4B8F8', color: '#fff', fontWeight: 700, fontSize: 11, borderRadius: 8, padding: '2px 8px'}}>Nuevo</div>}
                          {i === 2 && <div style={{position: 'absolute', top: 10, right: 10, background: '#1EE0B7', color: '#fff', fontWeight: 700, fontSize: 11, borderRadius: 8, padding: '2px 8px'}}>Recomendado</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Grid: Todas las Ofertas (8 cards, 2 per row) */}
                <div style={{marginTop: 18}}>
                  <div style={{fontWeight: 800, fontSize: 16, marginBottom: 8, color: TEXT}}>Todas las Ofertas</div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                    maxHeight: 520,
                    overflowY: 'auto',
                  }}>
                    {BRANDS.concat([
                      // Add 2 extra generic offers for a total of 8
                      {
                        id: 7,
                        name: 'CaféAmigo',
                        offer: '15% en bebidas y snacks',
                        description: 'Descuento en tu café favorito.',
                        code: 'CAFE15',
                        expires: '31/10/2024',
                        color: '#B4B8F8',
                        label: 'CA',
                        conditions: ['Solo en sucursales participantes', 'No acumulable', 'Presenta tu credencial']
                      },
                      {
                        id: 8,
                        name: 'GymFit',
                        offer: 'Mes gratis en inscripción',
                        description: 'Activa tu vida fitness con un mes gratis.',
                        code: 'GYMFIT1',
                        expires: '30/09/2024',
                        color: '#FFD6A5',
                        label: 'GF',
                        conditions: ['Solo para nuevos socios', 'Válido con credencial', 'No acumulable']
                      }
                    ]).slice(0, 8).map((brand, i) => (
                      <div
                        key={brand.id}
                        style={{
                          background: 'linear-gradient(120deg, #B4B8F8 0%, #FFD6A5 100%)',
                          borderRadius: 16,
                          boxShadow: '0 2px 8px 0 rgba(123,110,246,0.08)',
                          minHeight: 120,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '12px 6px',
                          border: `1.5px solid ${BORDER}`,
                          position: 'relative',
                        }}
                      >
                        {/* Heart icon */}
                        <div
                          style={{position: 'absolute', top: 8, left: 8, zIndex: 2, cursor: 'pointer', opacity: 0.7, background: 'rgba(255,255,255,0.6)', borderRadius: '50%', padding: 2}}
                          onClick={e => { e.stopPropagation(); toggleFavorite(brand.id); }}
                        >
                          <HeartIcon filled={favorites.includes(brand.id)} size={22} />
                        </div>
                        <div style={{marginBottom: 6}}><BrandIcon color={brand.color} label={brand.label} /></div>
                        <div style={{fontWeight: 800, fontSize: 14, color: TEXT, textAlign: 'center'}}>{brand.name}</div>
                        <div style={{fontSize: 13, color: TEXT, fontWeight: 500, textAlign: 'center'}}>{brand.offer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Detalles de la oferta */}
            {step === 3 && showDetails && (
              <>
                <div style={{marginTop: 32, background: 'linear-gradient(90deg, #B4B8F8 0%, #FFD6A5 100%)', borderRadius: 24, boxShadow: '0 2px 12px 0 rgba(123,110,246,0.08)', border: `1.5px solid ${BORDER}`, overflow: 'hidden'}}>
                  <div style={{padding: 26}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10}}>
                      <BrandIcon color={BRANDS[selectedOffer].color} label={BRANDS[selectedOffer].label} />
                      <div style={{fontWeight: 800, fontSize: 19}}>{BRANDS[selectedOffer].name}</div>
                    </div>
                    <div style={{fontWeight: 800, fontSize: 20, marginBottom: 8}}>{BRANDS[selectedOffer].offer}</div>
                    <div style={{fontSize: 17, color: SUBTLE, marginBottom: 12}}>{BRANDS[selectedOffer].description}</div>
                    <div style={{fontSize: 15, color: SUBTLE, marginBottom: 10}}>Vence: {BRANDS[selectedOffer].expires}</div>
                    <ul style={{fontSize: 15, color: SUBTLE, marginBottom: 16, paddingLeft: 20}}>
                      {BRANDS[selectedOffer].conditions.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                    <button
                      ref={copyCodeBtnRef}
                      style={{
                        width: '100%',
                        padding: '18px',
                        background: ACCENT,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 14,
                        fontWeight: 700,
                        fontSize: 19,
                        marginTop: 8,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onClick={() => setVendorPage(true)}
                    >
                      Ir a la oferta
                    </button>
                  </div>
                </div>
                {/* Ofertas Similares */}
                <div style={{marginTop: 28}}>
                  <div style={{fontWeight: 800, fontSize: 16, marginBottom: 10, color: TEXT}}>Ofertas Similares</div>
                  <div style={{display: 'flex', gap: 16, overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
                    {BRANDS.filter((b, i) => i !== selectedOffer).slice(0, 3).map((brand, i) => (
                      <div key={brand.id} style={{minWidth: 180, background: 'linear-gradient(120deg, #B4B8F8 0%, #FFD6A5 100%)', borderRadius: 18, boxShadow: '0 2px 8px 0 rgba(123,110,246,0.08)', padding: 16, border: `1.5px solid ${BORDER}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <BrandIcon color={brand.color} label={brand.label} />
                        <div style={{fontWeight: 800, fontSize: 15, color: TEXT, marginTop: 8, textAlign: 'center'}}>{brand.name}</div>
                        <div style={{fontSize: 13, color: TEXT, fontWeight: 500, textAlign: 'center', marginBottom: 2}}>{brand.offer}</div>
                        <button style={{marginTop: 10, background: ACCENT, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontWeight: 700, fontSize: 14, cursor: 'pointer'}} onClick={() => { setSelectedOffer(BRANDS.indexOf(brand)); setShowDetails(true); }}>Ver oferta</button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Floating Bottom Bar (with icons) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.97)',
            boxShadow: '0 -2px 16px 0 rgba(123,110,246,0.04)',
            padding: '0 0 0 0',
            borderBottomLeftRadius: RADIUS,
            borderBottomRightRadius: RADIUS,
            height: 72,
            alignItems: 'center',
          }}
        >
          <div style={{width: '100%', maxWidth: 420, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <HomeIcon active={step === 0} />
              <span style={{fontSize: 11, color: step === 0 ? ACCENT : SUBTLE, fontWeight: 700, marginTop: 2}}>Inicio</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <CategoryIcon active={step === 2} />
              <span style={{fontSize: 11, color: step === 2 ? ACCENT : SUBTLE, fontWeight: 700, marginTop: 2}}>Categorías</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <HeartIcon filled={step === 3} size={28} />
              <span style={{fontSize: 11, color: step === 3 ? ACCENT : SUBTLE, fontWeight: 700, marginTop: 2}}>Favoritos</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
              <UserIcon />
              <span style={{fontSize: 11, color: SUBTLE, fontWeight: 700, marginTop: 2}}>Perfil</span>
            </div>
          </div>
          {/* Floating CTA */}
          <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', pointerEvents: 'none'}}>
            {step === 4 && (
              <button
                style={{
                  minWidth: 180,
                  padding: '18px 32px',
                  background: ACCENT,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 22,
                  fontWeight: 800,
                  fontSize: 19,
                  boxShadow: '0 2px 8px rgba(123,110,246,0.10)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  pointerEvents: 'auto',
                  letterSpacing: 0.2,
                }}
                onClick={restart}
              >
                Reiniciar Demo
              </button>
            )}
          </div>
        </div>
      </div>
      {vendorPage && !vendorThankYou && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#F7F8FC',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          {/* TiendaUno header */}
          <div style={{width: '100%', maxWidth: 420, background: 'linear-gradient(90deg, #B4B8F8 0%, #FFD6A5 100%)', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: '24px 0 18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, boxShadow: '0 2px 8px rgba(44,62,80,0.10)'}}>
            <BrandIcon color={BRANDS[selectedOffer].color} label={BRANDS[selectedOffer].label} />
            <span style={{fontWeight: 900, fontSize: 22, color: TEXT}}>TiendaUno</span>
          </div>
          {/* Product section */}
          <div style={{width: '100%', maxWidth: 420, background: '#fff', borderBottomLeftRadius: 28, borderBottomRightRadius: 28, boxShadow: '0 8px 32px rgba(44,62,80,0.10)', padding: '32px 24px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(120deg, #B4B8F8 0%, #FFD6A5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18}}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="35" cy="60" rx="28" ry="7" fill="#E9EAFB"/>
                <rect x="18" y="30" width="34" height="18" rx="9" fill="#232946"/>
                <rect x="12" y="38" width="10" height="18" rx="5" fill="#B4B8F8"/>
                <rect x="48" y="38" width="10" height="18" rx="5" fill="#FFD6A5"/>
              </svg>
            </div>
            <div style={{fontWeight: 800, fontSize: 20, color: TEXT, marginBottom: 4}}>Audífonos ProSound</div>
            <div style={{fontSize: 15, color: SUBTLE, marginBottom: 8}}>Precio original: <span style={{textDecoration: 'line-through', color: '#B4B8F8'}}>$1,499</span></div>
            <div style={{fontSize: 15, color: ACCENT, fontWeight: 700, marginBottom: 6}}>Descuento aplicado: 40%</div>
            <div style={{background: '#E9EAFB', borderRadius: 8, padding: '6px 12px', fontWeight: 700, fontSize: 15, color: '#7B6EF6', marginBottom: 8}}>Código: {BRANDS[selectedOffer].code}</div>
            <div style={{fontWeight: 800, fontSize: 18, color: '#1EE0B7', marginBottom: 18}}>Total a pagar: $899</div>
            <div style={{display: 'flex', gap: 12, width: '100%', justifyContent: 'center', marginBottom: 18}}>
              <button style={{background: '#B4B8F8', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer'}}>Agregar al carrito</button>
              <button style={{background: ACCENT, color: '#fff', border: 'none', borderRadius: 12, padding: '12px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer'}} onClick={() => setVendorPayment(true)}>Comprar ahora</button>
            </div>
            <div style={{fontSize: 14, color: SUBTLE, marginBottom: 18}}>El descuento y código se aplicarán automáticamente en el pago.</div>
            <button style={{background: 'none', border: 'none', color: SUBTLE, fontWeight: 700, fontSize: 15, textDecoration: 'underline', cursor: 'pointer'}} onClick={() => { setVendorPage(false); setVendorThankYou(false); }}>Volver a Dommio</button>
          </div>
        </div>
      )}
      {vendorPage && vendorPayment && !vendorThankYou && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#F7F8FC',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <div style={{width: '100%', maxWidth: 420, background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(44,62,80,0.10)', padding: '38px 24px 32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontWeight: 900, fontSize: 20, color: TEXT, marginBottom: 10}}>Pago con Tarjeta</div>
            <div style={{fontWeight: 700, fontSize: 15, color: SUBTLE, marginBottom: 2}}>Precio original: <span style={{textDecoration: 'line-through', color: '#B4B8F8'}}>$1,499</span></div>
            <div style={{fontWeight: 700, fontSize: 15, color: ACCENT, marginBottom: 2}}>Código aplicado: {BRANDS[selectedOffer].code}</div>
            <div style={{fontWeight: 800, fontSize: 18, color: '#1EE0B7', marginBottom: 8}}>Total a pagar: $899</div>
            <form style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18}} onSubmit={e => { e.preventDefault(); setVendorPayment(false); setVendorThankYou(true); }}>
              <input type="text" value="4242 4242 4242 4242" readOnly placeholder="Número de tarjeta" style={{padding: '12px', borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 16, background: '#F7F8FC', color: '#232946', opacity: 0.8}} />
              <div style={{display: 'flex', gap: 10}}>
                <input type="text" value="12/28" readOnly placeholder="MM/AA" style={{flex: 1, padding: '12px', borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 16, background: '#F7F8FC', color: '#232946', opacity: 0.8}} />
                <input type="text" value="123" readOnly placeholder="CVC" style={{flex: 1, padding: '12px', borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 16, background: '#F7F8FC', color: '#232946', opacity: 0.8}} />
              </div>
              <input type="text" value="JUAN PÉREZ" readOnly placeholder="Nombre en la tarjeta" style={{padding: '12px', borderRadius: 10, border: `1.5px solid ${BORDER}`, fontSize: 16, background: '#F7F8FC', color: '#232946', opacity: 0.8, textTransform: 'uppercase'}} />
              <button type="submit" style={{marginTop: 8, background: ACCENT, color: '#fff', border: 'none', borderRadius: 12, padding: '14px 0', fontWeight: 800, fontSize: 17, cursor: 'pointer'}}>Pagar $899</button>
            </form>
            <button style={{background: 'none', border: 'none', color: SUBTLE, fontWeight: 700, fontSize: 15, textDecoration: 'underline', cursor: 'pointer'}} onClick={() => { setVendorPayment(false); setVendorPage(false); setVendorThankYou(false); }}>Cancelar y volver a Dommio</button>
          </div>
        </div>
      )}
      {vendorPage && vendorThankYou && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#F7F8FC',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <div style={{width: '100%', maxWidth: 420, background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(44,62,80,0.10)', padding: '48px 24px 36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{fontWeight: 900, fontSize: 22, color: '#1EE0B7', marginBottom: 10}}>¡Gracias por tu compra!</div>
            <div style={{fontWeight: 700, fontSize: 16, color: TEXT, marginBottom: 18, textAlign: 'center'}}>Tu descuento y código se aplicaron correctamente en TiendaUno.</div>
            <button style={{background: ACCENT, color: '#fff', border: 'none', borderRadius: 14, padding: '14px 38px', fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 12}} onClick={() => { setVendorPage(false); setVendorThankYou(false); setVendorPayment(false); setStep(4); }}>Volver a Dommio</button>
          </div>
        </div>
      )}
    </div>
  );
} 