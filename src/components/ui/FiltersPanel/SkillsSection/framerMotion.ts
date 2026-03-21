export const subcategoriesVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.07 // задержка между появлением каждого элемента
      }
    }
  };

export const itemVariants = {
    hidden: {
      x: -20,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };