from datetime import date

import boundaries

boundaries.register('Chicago Districts',
    encoding='iso-8859-1',
    last_updated=date(2018, 12, 18),
    name_func=boundaries.clean_attr('COMMUNITY'),
)