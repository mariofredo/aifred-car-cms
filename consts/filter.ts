const FILTER_PRODUCT_DETAIL = {
  variant: [
    {
      title: 'Variant Name',
      type: 'button',
      data: [
        {
          label: 'A to Z',
          value: 'asc',
          name: 'order_by_name_variant',
        },
        {
          label: 'Z to A',
          value: 'desc',
          name: 'order_by_name_variant',
        },
      ],
    },
    {
      title: 'Date Created',
      type: 'date',
      data: [
        {
          label: 'from',
          name: 'date_created_start_variant',
        },
        {
          label: 'until',
          name: 'date_created_end_variant',
        },
      ],
    },
    {
      title: 'Status',
      type: 'status_single',
      data: [
        {
          label: 'Publish',
          value: 1,
          name: 'is_active_variant',
        },
        {
          label: 'Unpublish',
          value: 0,
          name: 'is_active_variant',
        },
      ],
    },
  ],
  competitor: [
    {
      title: 'Brand',
      type: 'button',
      data: [
        {
          label: 'A to Z',
          value: 'asc',
          name: 'order_by_brand_competitor',
        },
        {
          label: 'Z to A',
          value: 'desc',
          name: 'order_by_brand_competitor',
        },
      ],
    },
    {
      title: 'Series Name',
      type: 'button',
      data: [
        {
          label: 'A to Z',
          value: 'asc',
          name: 'order_by_series_competitor',
        },
        {
          label: 'Z to A',
          value: 'desc',
          name: 'order_by_series_competitor',
        },
      ],
    },
    {
      title: 'Date Created',
      type: 'date',
      data: [
        {
          label: 'from',
          name: 'date_created_start_competitor',
        },
        {
          label: 'until',
          name: 'date_created_end_competitor',
        },
      ],
    },
    {
      title: 'Status',
      type: 'status_single',
      data: [
        {
          label: 'Publish',
          value: 1,
          name: 'is_active_competitor',
        },
        {
          label: 'Unpublish',
          value: 0,
          name: 'is_active',
        },
      ],
    },
  ],
};
