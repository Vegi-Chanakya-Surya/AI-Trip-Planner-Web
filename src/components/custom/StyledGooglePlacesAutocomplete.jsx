import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const StyledGooglePlacesAutocomplete = ({ value, onChange }) => {
  const customStyles = {
    container: (base) => ({
      ...base,
      width: '100%'
    }),
    control: (base, state) => ({
      ...base,
      borderWidth: '2px',
      borderColor: state.isFocused ? '#7a0ee3' : '#5f069f',
      backgroundColor: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--background)), 0 0 0 4px #7a0ee3' : 'none',
      '&:hover': {
        borderColor: '#7a0ee3'
      },
      transition: 'all 150ms'
    }),
    menuList: (base) => ({
      ...base,
      padding: '6px'
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'hsl(var(--background))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      marginTop: '8px',
      zIndex: 50,
      overflow: 'hidden'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'transparent',
      color: state.isFocused ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
      padding: '8px 12px',
      borderRadius: '0.25rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      '&:hover': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))'
      },
      '&:active': {
        backgroundColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))'
      },
      transition: 'all 150ms'
    }),
    input: (base) => ({
      ...base,
      color: 'hsl(var(--foreground))'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'hsl(var(--foreground))'
    }),
    placeholder: (base) => ({
      ...base,
      color: 'hsl(var(--muted-foreground))'
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? '#7a0ee3' : 'hsl(var(--muted-foreground))',
      opacity: state.isFocused ? 1 : 0.5,
      '&:hover': {
        color: '#7a0ee3',
        opacity: 1
      },
      transition: 'all 150ms',
      padding: '0 8px'
    }),
    clearIndicator: (base) => ({
      ...base,
      color: 'hsl(var(--muted-foreground))',
      '&:hover': {
        color: 'hsl(var(--foreground))'
      },
      padding: '0 8px'
    }),
    loadingIndicator: (base) => ({
      ...base,
      color: '#7a0ee3',
      padding: '0 8px'
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: 'hsl(var(--muted-foreground))'
    })
  };

  return (
    <div className="relative">
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps={{
          value,
          onChange,
          placeholder: 'Search for a location',
          styles: customStyles,
          components: {
            DropdownIndicator: ({ innerProps, isFocused }) => (
              <div {...innerProps} className={`p-2 ${isFocused ? 'text-[#7a0ee3]' : 'text-muted-foreground'} hover:text-[#7a0ee3] transition-colors`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="21" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
              </div>
            )
          }
        }}
      />
    </div>
  );
};

export default StyledGooglePlacesAutocomplete;