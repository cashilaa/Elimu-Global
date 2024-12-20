import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";

const TabsContext = React.createContext(null);

export const Tabs = React.forwardRef(({ 
  children, 
  defaultValue, 
  className,
  orientation = "horizontal",
  ...props 
}, ref) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);
  const tabContext = React.useMemo(() => ({
    activeTab,
    setActiveTab,
    orientation
  }), [activeTab, orientation]);

  return (
    <TabsContext.Provider value={tabContext}>
      <div
        ref={ref}
        className={cn(
          "w-full",
          orientation === "vertical" && "flex gap-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = "Tabs";

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
};

export const TabsList = React.forwardRef(({ children, className, ...props }, ref) => {
  const { orientation } = useTabsContext();
  
  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        "relative",
        orientation === "horizontal" 
          ? "inline-flex h-11 items-center justify-center rounded-lg bg-gray-100/50 p-1 text-gray-500 backdrop-blur-sm"
          : "flex flex-col space-y-1 rounded-lg bg-gray-100/50 p-1 text-gray-500 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef(({ children, value, className, ...props }, ref) => {
  const { activeTab, setActiveTab, orientation } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      onClick={() => setActiveTab(value)}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2",
        "text-sm font-medium ring-offset-white transition-all focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        orientation === "vertical" && "w-full justify-start",
        className
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className={cn(
            "absolute inset-0 bg-white rounded-md shadow-sm",
            "bg-gradient-to-br from-white to-gray-50"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
      )}
      <span className={cn(
        "relative z-10 transition-colors duration-200",
        isActive ? "text-gray-950" : "text-gray-600 hover:text-gray-900"
      )}>
        {children}
      </span>
    </button>
  );
});

TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef(({ children, value, className, ...props }, ref) => {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          ref={ref}
          role="tabpanel"
          id={`panel-${value}`}
          tabIndex={0}
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
          className={cn(
            "mt-4 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-gray-400 focus-visible:ring-offset-2",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

TabsContent.displayName = "TabsContent";